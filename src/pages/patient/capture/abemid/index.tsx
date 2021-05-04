import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Container, StepLabel, Radio, RadioGroup, FormControlLabel, FormGroup, Checkbox, Stepper, Step, StepButton, Grid, Popover, IconButton } from '@material-ui/core';
import { Help as HelpIcon } from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';

import {
  loadCareById,
  actionDocumentGroupAbemidRequest,
  actionDocumentAbemidRequest,
  actionDocumentAbemidStoreRequest,
  actionDocumentAbemidUpdateRequest,
  cleanAction
} from '../../../../store/ducks/cares/actions';
import { CareInterface, DocumentGroupInterface } from '../../../../store/ducks/cares/types';

import PatientCard from '../../../../components/Card/Patient';
import Loading from '../../../../components/Loading';
import Sidebar from '../../../../components/Sidebar';

import Button from '../../../../styles/components/Button';
import { FormTitle, QuestionSection, QuestionTitle, ScoreTotalContent, ScoreLabel, ScoreTotal } from '../../../../styles/components/Form';
import { StepperComponent, StepComponent, StepTitle } from '../../../../styles/components/Step';
import { handleUserSelectedId } from '../../../../helpers/localStorage';


import { ButtonsContent, FormContent } from './styles';
import { toast } from 'react-toastify';

interface IPageParams {
  id: string;
  documentId?: string;
}

interface IScore {
  total: number;
  complexity: string;
  status: string;
}

export default function Abemid(props: RouteComponentProps<IPageParams>) {
  const { params } = props.match;
  const { state: routeState } = props.location;

  const history = useHistory();
  const dispatch = useDispatch();

  const careState = useSelector((state: ApplicationState) => state.cares);
  const { documentGroupAbemid: documentGroupState, documentAbemid: documentState } = careState;

  const [care, setCare] = useState<CareInterface>();
  const [documentGroup, setDocumentGroup] = useState<DocumentGroupInterface>({
    _id: '',
    name: '',
    description: '',
    fields: [],
    created_at: '',
    created_by: { _id: '' },
    updated_at: '',
    updated_by: { _id: '' },
  });
  const [document, setDocument] = useState<any>();
  const [steps, setSteps] = useState([
    { title: 'KATZ', finished: (!!routeState.katzIsDone), score: { total: 0, complexity: "", status: "" } },
    { title: 'Abemid', finished: false, score: { total: 0, complexity: "", status: "" } },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const [anchorHelpPopover, setHelpPopover] = React.useState<HTMLButtonElement | null>(null);
  const openHelpPopover = Boolean(anchorHelpPopover);

  const handleNextStep = useCallback(() => {
    const isError = checkAllCurrentQuestionsAnswered(documentGroup, currentStep);

    if (isError) return;

    setCurrentStep((prevState) => prevState + 1);
  }, [currentStep, documentGroup]);

  const handleBackStep = useCallback(() => {
    setCurrentStep((prevState) => prevState - 1);
  }, [currentStep]);

  const handleNavigateStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, [currentStep]);

  const handleClickHelpPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setHelpPopover(event.currentTarget);
  };

  const handleCloseHelpPopover = () => {
    setHelpPopover(null);
  };

  useEffect(() => {
    dispatch(actionDocumentGroupAbemidRequest());
    dispatch(loadCareById(params.id));

    if (params?.documentId) {
      dispatch(actionDocumentAbemidRequest({ _id: params.documentId, care_id: params.id }));
    }
  }, []);

  useEffect(() => {
    if (careState.data?._id) {
      setCare(careState.data);
    }
  }, [careState]);

  useEffect(() => {
    if (!documentGroup._id) {
      setDocumentGroup(documentGroupState);
    }
  }, [documentGroupState]);

  useEffect(() => {
    if (documentState) {
      setDocument(documentState);

      if (
        documentState?.success &&
        !documentState?.loading &&
        !documentState?.error
      ) {
        if (care?._id) {
          history.push(`/patient/capture/${care._id}/overview/`, { success: true });
        }
      }
    }
  }, [careState.documentAbemid]);

  useEffect(() => {
    if (document?._id) {
      handleFieldAnswer();
    }
  }, [document]);

  useEffect(() => {
    calculateScore();
  }, [currentStep, document, documentGroup]);


  const checkAllCurrentQuestionsAnswered = useCallback((localDocumentGroup: DocumentGroupInterface, localCurrentStep: number) => {

    const currentStepAnswer = localDocumentGroup?.fields?.filter(field => field.step === localCurrentStep);
    const isAllQuestionAnswered = currentStepAnswer?.map(field => field?.options?.some(option => option.hasOwnProperty('selected')));
    const isError = isAllQuestionAnswered?.some(answered => !answered);

    if (isError) {
      toast.error("Selecione ao menos uma alternativa por pergunta");
    }

    return isError;
  }, [documentGroup, currentStep, documentGroupState]);

  const selectOption = useCallback((field_id: string, option_id: string, multiple: boolean = false) => {
    let documentGroupCopy = { ...documentGroup };

    documentGroupCopy?.fields?.map((field: any) => {
      if (field._id === field_id) {
        field.options.map((option: any) => {
          if (option._id === option_id) {
            if (option?.selected) {
              option.selected = !option.selected;
            } else {
              option.selected = true;
            }
          } else {
            if (!multiple) {
              option.selected = false;
            }
          }
        })
      }
    });

    setDocumentGroup(documentGroupCopy);
    calculateScore();

  }, [documentGroup]);

  const calculateScore = useCallback(() => {
    let partialScore = 0, countQuestionFive = 0;

    documentGroup?.fields?.map((field: any) => {
      if (field.step === currentStep) {
        field.options.map((option: any) => {
          if (option?.selected) {
            if (option.value === 5) {
              countQuestionFive++;
            }

            partialScore += parseInt(option.value);
          }
        });
      }
    });

    const getComplexity = (score: number) => {
      if (currentStep === 1) {
        if (countQuestionFive === 1) {
          return 'Média Complexidade';
        } else if (countQuestionFive > 1) {
          return 'Alta Complexidade';
        } else if (score >= 8 && score <= 12) {
          return 'Baixa Complexidade';
        } else if (score >= 13 && score <= 18) {
          return 'Média Complexidade';
        } else if (score >= 19) {
          return 'Alta Complexidade';
        } else {
          return 'Complexidade Não Detectada';
        }
      }
      // KATZ
      else if (currentStep === 0) {
        if (score < 2) {
          return "Dependente Total";
        } else if (score >= 3 && score <= 4) {
          return "Dependente Parcial";
        } else {
          return "Independente";
        }
      } else {
        return "Não Identificado";
      }
    };

    const getStatus = (score: number) => {
      if (score < 7) {
        return 'Não Elegível';
      } else {
        return 'Elegível';
      }
    };

    let stepsCopy = steps;

    stepsCopy[currentStep].score = {
      total: partialScore,
      complexity: getComplexity(partialScore),
      status: getStatus(partialScore),
    };

    setSteps(prevState => stepsCopy);

  }, [documentGroup, currentStep]);

  const handleFieldAnswer = useCallback(() => {
    let documentGroupCopy = { ...documentGroup };

    documentGroupCopy?.fields?.map((field: any) => {
      field.options.map((option: any) => {
        const optionFounded = document.fields?.find((opt: any) => {
          return opt.option_id === option._id
        });

        option.selected = (optionFounded) ? true : false;

        return option;
      });
    });

    setDocumentGroup(documentGroupCopy);
    calculateScore();
  }, [documentGroup, document]);

  const handleSubmit = useCallback(() => {
    let selecteds: any = [],
      complexitiesArray: any = [],
      statusArray: any = [];
    let complexity: string = "",
      status: string = "";

    const isError = checkAllCurrentQuestionsAnswered(documentGroup, currentStep);

    if (isError) return;

    documentGroup?.fields?.map((field: any) => {
      field.options.map((option: any) => {
        if (option?.selected) {
          selecteds.push({
            _id: field._id,
            description: field.description,
            option_id: option._id,
            value: option.value
          })
        }
      })
    });

    steps.forEach((step) => {
      complexitiesArray.push(step.score.complexity);
      statusArray.push(step.score.status);
    });

    if (
      complexitiesArray.findIndex(
        (item: string) => item === "Alta Complexidade"
      ) > -1
    ) {
      complexity = "Alta Complexidade";
    } else if (
      complexitiesArray.findIndex(
        (item: string) => item === "Média Complexidade"
      ) > -1
    ) {
      complexity = "Média Complexidade";
    } else if (
      complexitiesArray.findIndex(
        (item: string) => item === "Baixa Complexidade"
      ) > -1
    ) {
      complexity = "Baixa Complexidade";
    } else {
      complexity = "Sem Complexidade";
    }

    if (statusArray.find((item: string) => item === "Não Elegível")) {
      status = "Não Elegível";
    } else {
      status = "Elegível";
    }

    if (care?.patient_id?._id && care?._id) {
      const createDocumentParams = {
        patient_id: care.patient_id?._id,
        care_id: care?._id,
        document_group_id: documentGroup?._id || '',
        finished: true,
        canceled: false,
        fields: selecteds,
        complexity,
        status,
        created_by: { _id: handleUserSelectedId() || '' },
      };

      if (document?._id) {
        dispatch(actionDocumentAbemidUpdateRequest({ ...createDocumentParams, _id: document._id }));
      } else {
        dispatch(actionDocumentAbemidStoreRequest(createDocumentParams));
      }
    }

  }, [documentGroup, care, currentStep]);

  return (
    <Sidebar>
      {careState.loading && <Loading />}
      <Container>

        {care?.patient_id && (
          <>
            <h2>Paciente</h2>
            <PatientCard patient={care.patient_id} />
          </>
        )}

        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 40 }}>
          <FormTitle style={{ marginBottom: 0 }}>
            {documentGroup.name}
          </FormTitle>
          <IconButton aria-describedby={'popover_help_abemid'} onClick={handleClickHelpPopover} style={{ marginLeft: 10 }}>
            <HelpIcon style={{ color: "#ccc" }} />
          </IconButton >
          <Popover
            id={'popover_help_abemid'}
            open={openHelpPopover}
            anchorEl={anchorHelpPopover}
            onClose={handleCloseHelpPopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <div
              style={{ paddingTop: 20, paddingLeft: 30, paddingBottom: 20, paddingRight: 30, maxWidth: 500, listStylePosition: 'inside', textAlign: 'justify' }}>
              <p>Regra:</p>
              <br />
              <ul>
                <li>Ao obter 01 pontuação 5, o paciente migra automaticamente para Média Complexidade;</li>

                <li>Ao obter 02 ou mais pontuações 5, o paciente migra automaticamente para Alta Complexidade, independente do total de pontos obtidos (com cuidado).<br />Obs. A migração acima referida, ocorre independente dos pontos totais obtidos</li>

                <li>Em TODOS os itens de avaliação, EXCETO os relacionados a coluna SUPORTE TERAPÊUTICO, os pontos NÃO se somam, SEMPRE prevalecendo o item de MAIOR pontuação em decorrência da maior COMPLEXIDADE</li>
              </ul>
              <br />

              <ul>
                <li>Inferior a 07 pontos Paciente não elegível para Internação Domiciliar</li>
                <li>De 08 a 12 pontos Baixa Complexidade</li>
                <li>De 13 a 18 pontos Média Complexidade Acima de 19 pontos Alta Complexidade</li>
              </ul>
            </div>
          </Popover>

        </div>

        <StepperComponent activeStep={currentStep} alternativeLabel>
          {steps.map((step, index) => (
            <StepComponent
              key={`${step}_${index}`}
              onClick={() => handleNavigateStep(index)}
            >
              <StepLabel>{step.title}</StepLabel>
            </StepComponent>
          ))}
        </StepperComponent>

        <FormContent>
          {/* Score de KATZ */}
          {currentStep === 0 && (
            <>
              <StepTitle>KATZ</StepTitle>

              {documentGroup?.fields?.map((field: any, index: number) => {
                if (field.step === 0) {
                  return (
                    <QuestionSection key={`question_${field._id}_${index}`}>
                      <QuestionTitle>{field.description}</QuestionTitle>
                      <RadioGroup
                        onChange={(e) =>
                          selectOption(field._id, e.target.value)
                        }
                      >
                        {field.options.map((option: any, index: number) => (
                          <FormControlLabel
                            key={`option_${field._id}_${index}`}
                            value={option._id}
                            control={
                              <Radio
                                color="primary"
                                checked={option?.selected}
                              />
                            }
                            label={option.text}
                          />
                        ))}
                      </RadioGroup>
                    </QuestionSection>
                  );
                }
              })}

              <ScoreTotalContent>
                <ScoreLabel>PONTUAÇÃO KATZ:</ScoreLabel>
                <ScoreTotal>
                  {
                    steps[currentStep].score.total ?
                      `${steps[currentStep].score.total} - ${steps[currentStep].score.complexity}`
                      :
                      '0'
                  }
                </ScoreTotal>
              </ScoreTotalContent>
            </>
          )}

        </FormContent>
        <FormContent>

          {/* Grupo 1 */}
          {currentStep === 1 && (
            <>
              <StepTitle>Elegibilidade</StepTitle>

              {documentGroup?.fields?.map((field: any, index: number) => {
                if (field.step === 1) {
                  return (
                    <QuestionSection key={`question_${field._id}_${index}`}>
                      <QuestionTitle>{field.description}</QuestionTitle>

                      {field.type === 'radio' && (
                        <RadioGroup onChange={e => selectOption(field._id, e.target.value)}>
                          {field.options.map((option: any, index: number) => (
                            <FormControlLabel
                              key={`option_${field._id}_${index}`}
                              value={option._id}
                              control={<Radio color="primary" />}
                              label={option.text}
                              checked={option?.selected}
                            />
                          ))}
                        </RadioGroup>
                      )}

                      {field.type === 'check' && (
                        <FormGroup>
                          {field.options.map((option: any, index: number) => (
                            <FormControlLabel
                              key={`option_${field._id}_${index}`}
                              value={option._id}
                              onChange={e => selectOption(field._id, option._id, true)}
                              control={(
                                <Checkbox color="primary"
                                  checked={option?.selected ?? false}
                                />
                              )}
                              label={option.text}
                            />
                          ))}
                        </FormGroup>
                      )}
                    </QuestionSection>
                  );
                }
              })}

              <ScoreTotalContent>
                <ScoreLabel>TOTAL DE PONTOS:</ScoreLabel>
                <ScoreTotal>
                  {
                    steps[currentStep].score.total ?
                      `${steps[currentStep].score.total} - ${steps[currentStep].score.complexity}`
                      :
                      '0'
                  }
                </ScoreTotal>
              </ScoreTotalContent>
            </>
          )}
        </FormContent>

        <FormContent>
          <ButtonsContent>
            <Button
              background="default"
              onClick={() =>
                history.push(`/patient/capture/${care?._id}/overview`)
              }
            >
              Cancelar
            </Button>
            <Button
              disabled={currentStep === 0}
              background="default"
              onClick={handleBackStep}
            >
              Anterior
            </Button>

            {currentStep === steps.length - 1 ? (
              <>
                {careState.data.capture?.status === "Em Andamento" && (
                  <Button background="primary" onClick={handleSubmit}>
                    Finalizar
                  </Button>
                )}
              </>
            ) : (
              <Button
                disabled={currentStep === steps.length - 1}
                background="success"
                onClick={handleNextStep}
              >
                Próximo
              </Button>
            )}
          </ButtonsContent>
        </FormContent>

      </Container>
    </Sidebar>
  );
}
