import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Container, StepLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';

import {
  loadCareById,
  actionDocumentGroupNeadRequest,
  actionDocumentNeadRequest,
  actionDocumentNeadStoreRequest,
  actionDocumentNeadUpdateRequest
} from '../../../../store/ducks/cares/actions';
import { CareInterface, DocumentGroupInterface } from '../../../../store/ducks/cares/types';

import PatientCard from '../../../../components/Card/Patient';
import Loading from '../../../../components/Loading';
import Sidebar from '../../../../components/Sidebar';

import Button from '../../../../styles/components/Button';
import { FormTitle, QuestionSection, QuestionTitle, ScoreTotalContent, ScoreLabel, ScoreTotal } from '../../../../styles/components/Form';
import { StepperComponent, StepComponent, StepTitle } from '../../../../styles/components/Step';

import { ButtonsContent, FormContent } from './styles';

interface IPageParams {
  id: string;
  documentId?: string;
}

export default function Nead(props: RouteComponentProps<IPageParams>) {
  const { params } = props.match;

  const history = useHistory();
  const dispatch = useDispatch();

  const careState = useSelector((state: ApplicationState) => state.cares);
  const { documentGroupNead: documentGroupState, documentNead: documentState } = careState;

  const [steps, setSteps] = useState([
    { title: 'Grupo 1', score: { total: 0, complexity: '', status: '' } },
    { title: 'Grupo 2', score: { total: 0, complexity: '', status: '' } },
    { title: 'Grupo 3', score: { total: 0, complexity: '', status: '' } },
    { title: 'Escore de Katz', score: { total: 0, complexity: '', status: '' } }
  ]);
  const [currentStep, setCurrentStep] = useState(0);

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

  useEffect(() => {
    dispatch(actionDocumentGroupNeadRequest());
    dispatch(loadCareById(params.id));

    if (params?.documentId) {
      dispatch(actionDocumentNeadRequest({ _id: params.documentId, care_id: params.id }));
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
    }

    if (
      documentState?.success &&
      !documentState?.loading &&
      !documentState?.error
    ) {
      if (care?._id) {
        history.push(`/patient/capture/${care._id}/overview/`, { success: true });
      }
    }
  }, [documentState]);

  useEffect(() => {
    if (document?._id) {
      handleFieldAnswer();
    }
  }, [document, currentStep]);

  useEffect(() => {
    calculateScore();
  }, [documentGroup]);

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
    let partialScore = 0, countNoAnswers = 0, count24hours = 0, count12hours = 0;

    documentGroup?.fields?.map((field: any) => {
      if (field.step === currentStep) {
        field.options.map((option: any) => {
          if (option?.selected) {
            if (option.value === 'Não') {
              countNoAnswers++;
            } else if (parseInt(option.value) === 24) {
              count24hours++;
            } else if (parseInt(option.value) === 12) {
              count12hours++;
            } else {
              partialScore += parseInt(option.value);
            }
          }
        });
      }
    });

    const getComplexity = (score: number) => {
      if (currentStep === 1) {
        if (count24hours > 0) {
          return 'Alta Complexidade';
        } else if (count12hours > 0) {
          return 'Média Complexidade';
        } else {
          return 'Sem Complexidade';
        }
      } else if (currentStep === 2) {
        if (partialScore >= 6 && partialScore <= 11) {
          return 'Baixa Complexidade';
        } else if (partialScore >= 12 && partialScore <= 17) {
          return 'Média Complexidade';
        } else if (partialScore >= 18) {
          return 'Alta Complexidade';
        } else {
          return 'Sem Complexidade';
        }
      } else if (currentStep === 3) {
        if (score < 2) {
          return 'Alta Complexidade';
        } else if (score >= 3 && score <= 4) {
          return 'Média Complexidade';
        } else {
          return 'Baixa Complexidade';
        }
      } else {
        return 'Não Identificado';
      }
    };

    const getStatus = (score: number) => {
      if (currentStep === 0) {
        return (countNoAnswers > 0) ? 'Não Elegível' : 'Elegível';
      } else {
        return 'Não Identificado';
      }
    };

    let stepsCopy = steps;
    stepsCopy[currentStep].score = { total: partialScore, complexity: getComplexity(partialScore), status: getStatus(partialScore) };

    setSteps(stepsCopy);
  }, [documentGroup, steps]);

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
  }, [documentGroup, document]);

  const handleSubmit = useCallback(() => {
    let selecteds: any = [], complexitiesArray: any = [], statusArray: any = [];
    let complexity: string = '', status: string = '';

    documentGroup?.fields?.map((field: any) => {
      field.options.map((option: any) => {
        if (option?.selected) {
          selecteds.push({ _id: field._id, description: field.description, option_id: option._id, value: option.value })
        }
      })
    });

    steps.forEach(step => {
      complexitiesArray.push(step.score.complexity);
      statusArray.push(step.score.status);
    });

    if (complexitiesArray.findIndex((item: string) => (item === 'Alta Complexidade')) > -1) {
      complexity = 'Alta Complexidade';
    } else if (complexitiesArray.findIndex((item: string) => (item === 'Média Complexidade')) > -1) {
      complexity = 'Média Complexidade';
    } else if (complexitiesArray.findIndex((item: string) => (item === 'Baixa Complexidade')) > -1) {
      complexity = 'Baixa Complexidade';
    } else {
      complexity = 'Sem Complexidade';
    }

    if (statusArray.find((item: string) => (item === 'Não Elegível'))) {
      status = 'Não Elegível';
    } else {
      status = 'Elegível';
    }

    if (care?.patient_id?._id && care?._id) {
      const createDocumentParams = {
        pacient_id: care.patient_id?._id,
        care_id: care._id,
        document_group_id: documentGroup._id,
        finished: true,
        canceled: false,
        fields: selecteds,
        complexity,
        status,
        created_by: { _id: '5e8cfe7de9b6b8501c8033ac' },
      };

      if (document?._id) {
        dispatch(actionDocumentNeadUpdateRequest({ ...createDocumentParams, _id: document._id }));
      } else {
        dispatch(actionDocumentNeadStoreRequest(createDocumentParams));
      }
    }

  }, [documentGroup, care]);


  const handleNextStep = useCallback(() => {
    setCurrentStep(prevState => (prevState + 1))
  }, [currentStep]);

  const handleBackStep = useCallback(() => {
    setCurrentStep(prevState => (prevState - 1))
  }, [currentStep]);

  const handleNavigateStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [currentStep]);

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

        <FormTitle>Tabela de avaliação para planejamento de atenção domiciliar</FormTitle>
        <StepperComponent activeStep={currentStep} alternativeLabel>
          {steps.map((step, index) => (
            <StepComponent key={`${step}_${index}`} onClick={() => handleNavigateStep(index)}>
              <StepLabel>{step.title}</StepLabel>
            </StepComponent>
          ))}
        </StepperComponent>

        <FormContent>
          {/* Grupo 1 */}
          {currentStep === 0 && (
            <>
              <StepTitle>Elegibilidade</StepTitle>

              {documentGroup?.fields?.map((field: any, index: number) => {
                if (field.step === 0) {
                  return (
                    <QuestionSection key={`question_${field._id}_${index}`}>
                      <QuestionTitle>{field.description}</QuestionTitle>
                      <RadioGroup onChange={e => selectOption(field._id, e.target.value)}>
                        {field.options.map((option: any, index: number) => (
                          <FormControlLabel
                            key={`option_${field._id}_${index}`}
                            value={option._id}
                            control={(
                              <Radio
                                color="primary"
                                checked={option?.selected}
                              />
                            )}
                            label={option.text}
                          />
                        ))}
                      </RadioGroup>
                    </QuestionSection>
                  );
                }
              })}

              <p><i>*Se responder "NÃO" a qualquer uma das questões acima, considerar contraindicar Atenção Domiciliar</i></p>
            </>
          )}

          {/* Grupo 2 */}
          {currentStep === 1 && (
            <>
              <StepTitle>Critérios para indicação imediata de internação domiciliar*</StepTitle>

              {documentGroup?.fields?.map((field: any, index: number) => {
                if (field.step === 1) {
                  return (
                    <QuestionSection key={`question_${field._id}_${index}`}>
                      <QuestionTitle>{field.description}</QuestionTitle>
                      <RadioGroup onChange={e => selectOption(field._id, e.target.value)}>
                        {field.options.map((option: any, index: number) => (
                          <FormControlLabel
                            key={`option_${field._id}_${index}`}
                            value={option._id}
                            control={(
                              <Radio
                                color="primary"
                                checked={option?.selected}
                              />
                            )}
                            label={option.text}
                          />
                        ))}
                      </RadioGroup>
                    </QuestionSection>
                  );
                }
              })}

              <p><i>*Para indicação de Planejamento de Atenção (P.A.D.), considerar a maior complexidade assinalada, ainda que a única vez.</i></p>
            </>
          )}

          {/* Grupo 3 */}
          {currentStep === 2 && (
            <>
              <StepTitle>Critérios para indicação imediata de internação domiciliar</StepTitle>

              {documentGroup?.fields?.map((field: any, index: number) => {
                if (field.step === 2) {
                  return (
                    <QuestionSection key={`question_${field._id}_${index}`}>
                      <QuestionTitle>{field.description}</QuestionTitle>
                      <RadioGroup onChange={e => selectOption(field._id, e.target.value)}>
                        {field.options.map((option: any, index: number) => (
                          <FormControlLabel
                            key={`option_${field._id}_${index}`}
                            value={option._id}
                            control={(
                              <Radio
                                color="primary"
                                checked={option?.selected}
                              />
                            )}
                            label={option.text}
                          />
                        ))}
                      </RadioGroup>
                    </QuestionSection>
                  );
                }
              })}

              <ScoreTotalContent>
                <ScoreLabel>PONTUAÇÃO FINAL:</ScoreLabel>
                <ScoreTotal>{steps[currentStep].score.total}</ScoreTotal>
              </ScoreTotalContent>
            </>
          )}

          {/* Score de Katz */}
          {currentStep === 3 && (
            <>
              <StepTitle>Atividades</StepTitle>

              {documentGroup?.fields?.map((field: any, index: number) => {
                if (field.step === 3) {
                  return (
                    <QuestionSection key={`question_${field._id}_${index}`}>
                      <QuestionTitle>{field.description}</QuestionTitle>
                      <RadioGroup onChange={e => { selectOption(field._id, e.target.value) }}>
                        {field.options.map((option: any, index: number) => (
                          <FormControlLabel
                            key={`option_${field._id}_${index}`}
                            value={option._id}
                            control={(
                              <Radio
                                color="primary"
                                checked={option?.selected}
                              />
                            )}
                            label={option.text}
                            checked={option?.selected}
                          />
                        ))}
                      </RadioGroup>
                    </QuestionSection>
                  );
                }
              })}

              <ScoreTotalContent>
                <ScoreLabel>PONTUAÇÃO KATZ:</ScoreLabel>
                <ScoreTotal>{steps[currentStep].score.total}</ScoreTotal>
              </ScoreTotalContent>
            </>
          )}

          <ButtonsContent>
            <Button
              background="default"
              onClick={() => history.push(`/patient/capture/${care?._id}/overview`)}
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

            {currentStep === (steps.length - 1) ? (
              <Button
                background="primary"
                onClick={handleSubmit}
              >
                Finalizar
              </Button>
            ) : (
                <Button
                  disabled={currentStep === (steps.length - 1)}
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
