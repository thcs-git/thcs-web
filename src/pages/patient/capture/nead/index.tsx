import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useHistory, RouteComponentProps} from 'react-router-dom';
import {
  Container,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Popover,
  FormHelperText,
  FormControl
} from '@material-ui/core';
import {Help as HelpIcon} from '@material-ui/icons';
import {toast} from 'react-toastify';

import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../../../../store';

import {
  loadCareById,
  actionDocumentGroupNeadRequest,
  actionDocumentNeadRequest,
  actionDocumentNeadStoreRequest,
  actionDocumentNeadUpdateRequest,
  cleanAction,
} from "../../../../store/ducks/cares/actions";
import {
  CareInterface,
  DocumentGroupInterface,
} from "../../../../store/ducks/cares/types";

import PatientCard from "../../../../components/Card/Patient";
import Loading from "../../../../components/Loading";
import Sidebar from "../../../../components/Sidebar";

import Button from "../../../../styles/components/Button";
import {
  FormTitle,
  QuestionSection,
  QuestionTitle,
  ScoreTotalContent,
  ScoreLabel,
  ScoreTotal,
} from "../../../../styles/components/Form";
import {
  StepperComponent,
  StepComponent,
  StepTitle,
} from "../../../../styles/components/Step";
import {handleUserSelectedId} from '../../../../helpers/localStorage';

import {ButtonsContent, FormContent} from "./styles";
import _ from "lodash";
import ButtonComponent from "../../../../styles/components/Button";
import {HeaderContent} from "../../../care/overview/schedule/styles";

interface IPageParams {
  id: string;
  documentId?: string;
}

export default function Nead(props: RouteComponentProps<IPageParams>) {
  const {params} = props.match;

  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Selecione uma opção');
  const formNeadRef = useRef<HTMLFormElement>(null);
  const careState = useSelector((state: ApplicationState) => state.cares);
  const {
    documentGroupNead: documentGroupState,
    documentNead: documentState,
  } = careState;

  const [
    anchorHelpPopover,
    setHelpPopover,
  ] = React.useState<HTMLButtonElement | null>(null);
  const openHelpPopover = Boolean(anchorHelpPopover);

  const [
    anchorHelpGroup3Popover,
    setHelpGroup3Popover,
  ] = React.useState<HTMLButtonElement | null>(null);
  const openHelpGroup3Popover = Boolean(anchorHelpGroup3Popover);

  const [steps, setSteps] = useState([
    {
      title: "Escore de Katz",
      score: {total: 0, complexity: "", status: ""},
    },
    {title: "Grupo 1", score: {total: 0, complexity: "", status: ""}},
    {title: "Grupo 2", score: {total: 0, complexity: "", status: ""}},
    {title: "Grupo 3", score: {total: 0, complexity: "", status: ""}},
  ]);

  const [currentStep, setCurrentStep] = useState(0);

  const [care, setCare] = useState<CareInterface>();
  const [documentGroup, setDocumentGroup] = useState<DocumentGroupInterface>({
    _id: "",
    name: "",
    description: "",
    fields: [],
    created_at: "",
    created_by: {_id: ""},
    updated_at: "",
    updated_by: {_id: ""},
  });
  const [document, setDocument] = useState<any>();

  useEffect(() => {
    dispatch(actionDocumentGroupNeadRequest());
    dispatch(loadCareById(params.id));

    if (params?.documentId) {
      dispatch(
        actionDocumentNeadRequest({
          _id: params.documentId,
          care_id: params.id,
        })
      );
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
        history.push(`/patient/capture/${care._id}/overview/`, {
          success: true,
        });
      }
    }
  }, [documentState]);

  useEffect(() => {
    if (document?._id) {
      handleFieldAnswer();
    }
  }, [document]);

  useEffect(() => {
    calculateScore();
  }, [currentStep, document, documentGroup]);

  const selectOption = useCallback(
    (field_id: string, option_id: string, multiple: boolean = false) => {
      let documentGroupCopy = {...documentGroup};

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
          });
        }
      });

      setDocumentGroup(documentGroupCopy);
      calculateScore();
    },
    [documentGroup]
  );

  const calculateScore = useCallback(() => {
    let partialScore = 0,
      countNoAnswers = 0,
      count24hours = 0,
      count12hours = 0;

    documentGroup?.fields?.map((field: any) => {
      if (field.step === currentStep) {
        field.options.map((option: any) => {
          if (option?.selected) {
            if (option.value === "Não") {
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
      // Critérios para indicação imediata de internação domiciliar (GRUPO 2)
      if (currentStep === 2) {
        if (count24hours > 0) {
          return "Alta Complexidade";
        } else if (count12hours > 0) {
          return "Média Complexidade";
        } else {
          return "Atenção Domiciliar";
        }
      }
      // Atividades (GRUPO 3)
      else if (currentStep === 3) {
        if (partialScore >= 6 && partialScore <= 11) {
          return "Baixa Complexidade";
        } else if (partialScore >= 12 && partialScore <= 17) {
          return "Média Complexidade";
        } else if (partialScore >= 18) {
          return "Alta Complexidade";
        } else {
          return "Atenção Domiciliar";
        }
      }
      // KATZ
      else if (currentStep === 0) {
        if (score <= 2) {
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
      // Elegibilidade (GRUPO 1)
      if (currentStep === 1) {
        return countNoAnswers > 0 ? "Não Elegível" : "Elegível";
      } else {
        return "Não Identificado";
      }
    };

    let stepsCopy = [...steps];
    stepsCopy[currentStep].score = {
      total: partialScore,
      complexity: getComplexity(partialScore),
      status: getStatus(partialScore),
    };

    setSteps(prevState => stepsCopy);
  }, [documentGroup, steps, currentStep]);

  const isDone = useCallback(() => {
    let documentObj = _.find(care?.documents_id, {document_group_id: {name: 'NEAD'}});
    return documentObj?.finished ? documentObj?.finished : false
  }, [care]);

  const handleFieldAnswer = useCallback(() => {
    let documentGroupCopy = {...documentGroup};

    documentGroupCopy?.fields?.map((field: any) => {
      field.options.map((option: any) => {
        const optionFounded = document.fields?.find((opt: any) => {
          return opt.option_id === option._id;
        });

        option.selected = optionFounded ? true : false;

        return option;
      });
    });

    setDocumentGroup(documentGroupCopy);
  }, [documentGroup, document]);

  const handleSubmit = useCallback(() => {
    const isError = checkAllCurrentQuestionsAnswered();

    if (isError) return;

    let selecteds: any = [],
      complexitiesArray: any = [],
      statusArray: any = [];
    let complexity: string = "",
      status: string = "";

    documentGroup?.fields?.map((field: any) => {
      field.options.map((option: any) => {
        if (option?.selected) {
          selecteds.push({
            _id: field._id,
            description: field.description,
            option_id: option._id,
            value: option.value,
          });
        }
      });
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
        document_group_id: documentGroup._id,
        finished: true,
        canceled: false,
        fields: selecteds,
        complexity,
        status,
        created_by: {_id: handleUserSelectedId() || ''},
      };

      if (document?._id) {
        dispatch(
          actionDocumentNeadUpdateRequest({
            ...createDocumentParams,
            _id: document._id,
          })
        );
      } else {
        dispatch(actionDocumentNeadStoreRequest(createDocumentParams));
      }
    }
  }, [documentGroup, care]);

  const checkAllCurrentQuestionsAnswered = useCallback(() => {
    const localDocumentGroup = (!!documentGroup?.fields?.length) ? documentGroup : documentGroupState;

    const currentStepAnswer = localDocumentGroup?.fields?.filter(field => field.step === currentStep);
    const isAllQuestionAnswered = currentStepAnswer?.map(field => field?.options?.some(option => option.hasOwnProperty('selected')));
    const isError = isAllQuestionAnswered?.some(answered => !answered);

    if (isError) {
      toast.error("Selecione ao menos uma alternativa por pergunta");
    }

    return isError;
  }, [documentGroup, currentStep]);


  const handleNextStep = useCallback(() => {
    let isError = null

    if (isDone() || careState.data.capture?.status != 'Em Andamento') {

    } else {
      isError = checkAllCurrentQuestionsAnswered();
    }

    if (isError) return;

    window.scrollTo(0, 200)

    setCurrentStep((prevState) => prevState + 1);
  }, [currentStep, documentGroup]);

  const clearDocument = useCallback(() => {
    let documentGroupCopy = {...documentGroup};

    documentGroupCopy?.fields?.map((field: any) => {
      field.options.map((option: any) => {
        option.selected = false
      })
    })

    setDocumentGroup(documentGroupCopy);

    steps?.map((field: any) => {
      field.score.total = 0
    })
  }, [documentGroup, steps]);

  const handleBackStep = useCallback(() => {
    setCurrentStep((prevState) => prevState - 1);
    window.scrollTo(0, 200)
  }, [currentStep]);

  const handleNavigateStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, [currentStep]);

  const handleClickHelpPopover = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setHelpPopover(event.currentTarget);
  };

  const handleCloseHelpPopover = () => {
    setHelpPopover(null);
  };

  const handleClickHelpGroup3Popover = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setHelpGroup3Popover(event.currentTarget);
  };

  const handleCloseHelpGroup3Popover = () => {
    setHelpGroup3Popover(null);
  };

  return (
    <Sidebar>
      {careState.loading && <Loading/>}
      <Container>
        {care?.patient_id && (
          <>
            <h2>Paciente</h2>
            <PatientCard patient={care.patient_id}capture={care.capture}/>
          </>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 40,
          }}
        >
          <FormTitle style={{margin: 0}}>
            Tabela de avaliação para planejamento de atenção domiciliar
          </FormTitle>
          <IconButton
            aria-describedby={"popover_help_abemid"}
            onClick={handleClickHelpPopover}
            style={{marginLeft: 10}}
          >
            <HelpIcon style={{color: "#ccc"}}/>
          </IconButton>
          {!isDone() && careState.data.capture?.status === 'Em Andamento' && (
            <>
              <ButtonComponent onClick={() => {
                clearDocument()
              }} background="primary">
                Limpar Campos
              </ButtonComponent>
            </>
          )}

          <Popover
            id={"popover_help_abemid"}
            open={openHelpPopover}
            anchorEl={anchorHelpPopover}
            onClose={handleCloseHelpPopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div
              style={{
                paddingTop: 20,
                paddingLeft: 30,
                paddingBottom: 20,
                paddingRight: 30,
                maxWidth: 500,
                listStylePosition: "inside",
                textAlign: "justify",
              }}
            >
              <p>Regra:</p>
              <br/>
              <ul>
                <li>KATZ</li>
                <p>Classificação:</p>
                <p>
                  5 ou 6 - Independente<br/>
                  3 ou 4 - Dependente Parcial<br/>
                  {`< 2 - Dependente Total`}</p>
                <br/>

                <li>GRUPO 1 – ELEGIBILIDADE</li>
                <p>
                  Se responder <b>NÃO</b> a qualquer uma das questões,
                  considerar contraindicar Atenção Domiciliar
                </p>
                <br/>

                <li>
                  GRUPO 2 – CRITÉRIOS PARA INDICAÇÃO IMEDIATA DE INTERNAÇÃO
                  DOMICILIAR
                </li>
                <p>
                  Para indicação de Planejamento de Atenção Domiciliar (P.A.D.),
                  considerar a maior complexidade assinalada, ainda que uma
                  única vez.
                </p>
                <br/>

                <li>
                  GRUPO 3 – CRITÉRIOS DE APOIO PARA INDICAÇÃO DE PLANEJAMENTO DE
                  ATENÇÃO DOMICILIAR
                </li>
                <p>
                  A resposta da pergunta três deve vir preenchida conforme o
                  resultado da classificação do KATZ
                </p>
                <br/>

                <li>
                  Até 5 Pontos - Considerar procedimentos pontuais exclusivos ou
                  outros programas:
                </li>
                <p>
                  ( ) Curativos ( ) Medicações Parenterais ( ) Outros Programas
                </p>
                <br/>

                <li>
                  De 6 a 11 Pontos - Considerar Atendimento Domiciliar
                  Multiprofissional (inclui procedimentos pontuais, desde que
                  não exclusivos)
                </li>
                <br/>

                <li>
                  De 12 a 17 Pontos - Considerar Internação Domiciliar 12h
                </li>
                <br/>

                <li>
                  18 ou mais Pontos - Considerar Internação Domiciliar 24h
                </li>
                <br/>
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

        {careState.data.capture?.status != 'Em Andamento' ? (
          <>
            <FormContent>
              {/* Score de KATZ */}
              {currentStep === 0 && (
                <>
                  <StepTitle>KATZ</StepTitle>

                  {documentGroup?.fields?.map((field: any, index: number) => {
                    if (field.step === 0) {
                      return (
                        <FormControl component="form" ref={formNeadRef} onSubmit={(e: any) => {
                          e.preventDefault();
                        }}>
                          <QuestionSection key={`question_${field._id}_${index}`}>
                            <QuestionTitle>{field.description}</QuestionTitle>
                            <RadioGroup style={{width: 'fit-content'}}>
                              {/* {() => handleSelectRadio(field)} */}
                              {/* <FormHelperText>{(field.options.some((option: any) => option.selected)) ? '' : 'error'}</FormHelperText> */}
                              {field.options.map((option: any, index: number) => (
                                <FormControlLabel
                                  key={`option_${field._id}_${index}`}
                                  value={option._id}
                                  control={(
                                    <Radio
                                      color="primary"
                                      checked={isDone() ? option?.selected : false}

                                    />
                                  )}
                                  label={option.text}
                                />
                              ))}
                            </RadioGroup>
                          </QuestionSection>
                        </FormControl>
                      );
                    }
                  })}

                  <ScoreTotalContent>
                    <ScoreLabel>PONTUAÇÃO KATZ:</ScoreLabel>
                    <ScoreTotal>
                      {steps[currentStep].score.total} -{" "}
                      {steps[currentStep].score.complexity}
                    </ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}

              {/* Grupo 1 */}
              {currentStep === 1 && (
                <>
                  <StepTitle>Elegibilidade</StepTitle>

                  {documentGroup?.fields?.map((field: any, index: number) => {
                    if (field.step === 1) {
                      return (
                        <QuestionSection key={`question_${field._id}_${index}`}>
                          <QuestionTitle>{field.description}</QuestionTitle>
                          <RadioGroup>
                            {field.options.map((option: any, index: number) => (
                              <FormControlLabel
                                onError={() => alert('erro')}
                                key={`option_${field._id}_${index}`}
                                value={option._id}
                                control={
                                  <Radio
                                    color="primary"
                                    checked={isDone() ? option?.selected : false}
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

                  <p>
                    <i>
                      *Se responder "NÃO" a qualquer uma das questões acima,
                      considerar contraindicar Atenção Domiciliar
                    </i>
                  </p>
                  <br/>

                  <ScoreTotalContent>
                    <ScoreLabel>ELEGIBILIDADE:</ScoreLabel>
                    <ScoreTotal>
                      {steps[currentStep].score.status ? steps[currentStep].score.status : "Não Elegível"}
                    </ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}

              {/* Grupo 2 */}
              {currentStep === 2 && (
                <>
                  <StepTitle>
                    Critérios para indicação imediata de internação domiciliar
                  </StepTitle>

                  {documentGroup?.fields?.map((field: any, index: number) => {
                    if (field.step === 2) {
                      return (
                        <QuestionSection key={`question_${field._id}_${index}`}>
                          <QuestionTitle>{field.description}</QuestionTitle>
                          <RadioGroup>
                            {field.options.map((option: any, index: number) => (
                              <FormControlLabel
                                key={`option_${field._id}_${index}`}
                                value={option._id}
                                control={
                                  <Radio
                                    color="primary"
                                    checked={isDone() ? option?.selected : false}
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

                  <p>
                    <i>
                      *Para indicação de Planejamento de Atenção (P.A.D.),
                      considerar a maior complexidade assinalada, ainda que a única
                      vez.
                    </i>
                  </p>

                  <ScoreTotalContent>
                    <ScoreLabel>P.A.D.:</ScoreLabel>
                    <ScoreTotal>
                      {steps[currentStep].score.complexity ? steps[currentStep].score.complexity : "Não Elegível"}
                    </ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}

              {/* Grupo 3 */}
              {currentStep === 3 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      marginBottom: 40,
                    }}
                  >
                    <StepTitle style={{margin: 0}}>
                      Critérios de apoio para indicação de planejamento de atenção
                      domiciliar
                    </StepTitle>

                    <IconButton
                      aria-describedby={"popover_help_abemid_group_3"}
                      onClick={handleClickHelpGroup3Popover}
                      style={{marginLeft: 10}}
                    >
                      <HelpIcon style={{color: "#ccc"}}/>
                    </IconButton>
                    <Popover
                      id={"popover_help_abemid_group_3"}
                      open={openHelpGroup3Popover}
                      anchorEl={anchorHelpGroup3Popover}
                      onClose={handleCloseHelpGroup3Popover}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <div
                        style={{
                          paddingTop: 20,
                          paddingLeft: 30,
                          paddingBottom: 20,
                          paddingRight: 30,
                          maxWidth: 500,
                          listStylePosition: "inside",
                          textAlign: "justify",
                        }}
                      >
                        <p>Regra:</p>
                        <br/>
                        <ul>
                          <li>
                            Até 5 Pontos - Considerar procedimentos pontuais
                            exclusivos ou outros programas:
                          </li>
                          <p>
                            ( ) Curativos ( ) Medicações Parenterais ( ) Outros
                            Programas
                          </p>
                          <br/>

                          <li>
                            De 6 a 11 Pontos - Considerar Atendimento Domiciliar
                            Multiprofissional (inclui procedimentos pontuais, desde
                            que não exclusivos)
                          </li>
                          <br/>

                          <li>
                            De 12 a 17 Pontos - Considerar Internação Domiciliar 12h
                          </li>
                          <br/>

                          <li>
                            18 ou mais Pontos - Considerar Internação Domiciliar 24h
                          </li>
                          <br/>
                        </ul>
                      </div>
                    </Popover>
                  </div>

                  {documentGroup?.fields?.map((field: any, index: number) => {
                    if (field.step === 3) {

                      const getKatz = (option: any, score: number) => {
                        option.selected = false
                        if (option.value === '0') {
                          if (score > 4) {
                            option.selected = true
                          }
                        } else if (option.value === '1') {
                          if (score >= 3 && score <= 4) {
                            option.selected = true
                          }
                        } else if (option.value === '2') {
                          if (score <= 2) {
                            option.selected = true
                          }
                        } else {
                          option.selected = false
                        }
                        return option
                      };

                      return (
                        <QuestionSection key={`question_${field._id}_${index}`}>

                          {(field.description === '3. KATZ (se pediatria, considerar dependência total)') ? (
                            <>
                              <QuestionTitle>{field.description}</QuestionTitle>
                              <RadioGroup>
                                {field.options.map((option: any, index: number) => (
                                  <>
                                    {/*{console.log(option)}*/}
                                    <FormControlLabel
                                      key={`option_${field._id}_${index}`}
                                      value={getKatz(option, steps[0].score.total)}
                                      control={
                                        <Radio
                                          color="primary"
                                          checked={isDone() ? option?.selected : false}
                                        />
                                      }
                                      label={option.text}
                                      checked={isDone() ? option?.selected : false}
                                    />
                                  </>
                                ))}
                              </RadioGroup>
                            </>
                          ) : (
                            <>
                              <QuestionTitle>{field.description}</QuestionTitle>
                              <RadioGroup>
                                {field.options.map((option: any, index: number) => (
                                  <>
                                    <FormControlLabel
                                      key={`option_${field._id}_${index}`}
                                      value={option._id}
                                      control={
                                        <Radio
                                          color="primary"
                                          checked={isDone() ? option?.selected : false}
                                        />
                                      }
                                      label={option.text}
                                      checked={isDone() ? option?.selected : false}
                                    />
                                  </>
                                ))}
                              </RadioGroup>
                            </>
                          )}
                        </QuestionSection>
                      );
                    }
                  })}

                  <ScoreTotalContent>
                    <ScoreLabel>PONTUAÇÃO FINAL:</ScoreLabel>
                    <ScoreTotal>
                      {steps[currentStep].score.total} -{" "}
                      {steps[currentStep].score.complexity}
                    </ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}

              <ButtonsContent>
                <Button
                  background="default"
                  onClick={() =>
                    history.push(`/patient/capture/${care?._id}/overview`)
                  }
                >
                  Voltar
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
                    disabled={currentStep === (steps.length - 1)}
                    background="success"
                    type="submit"
                    onClick={handleNextStep}
                  >
                    Próximo
                  </Button>
                )}
              </ButtonsContent>
            </FormContent>
          </>
        ) : (
          <>
            <FormContent>
              {/* Score de KATZ */}
              {currentStep === 0 && (
                <>
                  <StepTitle>KATZ</StepTitle>

                  {documentGroup?.fields?.map((field: any, index: number) => {
                    if (field.step === 0) {
                      return (
                        <FormControl component="form" ref={formNeadRef} onSubmit={(e: any) => {
                          e.preventDefault();
                        }}>
                          <QuestionSection key={`question_${field._id}_${index}`}>
                            <QuestionTitle>{field.description}</QuestionTitle>
                            <RadioGroup style={{width: 'fit-content'}}
                                        onChange={e => selectOption(field._id, e.target.value)}>
                              {/* {() => handleSelectRadio(field)} */}
                              {/* <FormHelperText>{(field.options.some((option: any) => option.selected)) ? '' : 'error'}</FormHelperText> */}
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
                        </FormControl>
                      );
                    }
                  })}

                  <ScoreTotalContent>
                    <ScoreLabel>PONTUAÇÃO KATZ:</ScoreLabel>
                    <ScoreTotal>
                      {steps[currentStep].score.total} -{" "}
                      {steps[currentStep].score.complexity}
                    </ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}

              {/* Grupo 1 */}
              {currentStep === 1 && (
                <>
                  <StepTitle>Elegibilidade</StepTitle>

                  {documentGroup?.fields?.map((field: any, index: number) => {
                    if (field.step === 1) {
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
                                onError={() => alert('erro')}
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

                  <p>
                    <i>
                      *Se responder "NÃO" a qualquer uma das questões acima,
                      considerar contraindicar Atenção Domiciliar
                    </i>
                  </p>
                  <br/>

                  <ScoreTotalContent>
                    <ScoreLabel>ELEGIBILIDADE:</ScoreLabel>
                    <ScoreTotal>
                      {steps[currentStep].score.status ? steps[currentStep].score.status : "Não Elegível"}
                    </ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}

              {/* Grupo 2 */}
              {currentStep === 2 && (
                <>
                  <StepTitle>
                    Critérios para indicação imediata de internação domiciliar
                  </StepTitle>

                  {documentGroup?.fields?.map((field: any, index: number) => {
                    if (field.step === 2) {
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

                  <p>
                    <i>
                      *Para indicação de Planejamento de Atenção (P.A.D.),
                      considerar a maior complexidade assinalada, ainda que a única
                      vez.
                    </i>
                  </p>

                  <ScoreTotalContent>
                    <ScoreLabel>P.A.D.:</ScoreLabel>
                    <ScoreTotal>
                      {steps[currentStep].score.complexity ? steps[currentStep].score.complexity : "Não Elegível"}
                    </ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}

              {/* Grupo 3 */}
              {currentStep === 3 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      marginBottom: 40,
                    }}
                  >
                    <StepTitle style={{margin: 0}}>
                      Critérios de apoio para indicação de planejamento de atenção
                      domiciliar
                    </StepTitle>

                    <IconButton
                      aria-describedby={"popover_help_abemid_group_3"}
                      onClick={handleClickHelpGroup3Popover}
                      style={{marginLeft: 10}}
                    >
                      <HelpIcon style={{color: "#ccc"}}/>
                    </IconButton>
                    <Popover
                      id={"popover_help_abemid_group_3"}
                      open={openHelpGroup3Popover}
                      anchorEl={anchorHelpGroup3Popover}
                      onClose={handleCloseHelpGroup3Popover}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <div
                        style={{
                          paddingTop: 20,
                          paddingLeft: 30,
                          paddingBottom: 20,
                          paddingRight: 30,
                          maxWidth: 500,
                          listStylePosition: "inside",
                          textAlign: "justify",
                        }}
                      >
                        <p>Regra:</p>
                        <br/>
                        <ul>
                          <li>
                            Até 5 Pontos - Considerar procedimentos pontuais
                            exclusivos ou outros programas:
                          </li>
                          <p>
                            ( ) Curativos ( ) Medicações Parenterais ( ) Outros
                            Programas
                          </p>
                          <br/>

                          <li>
                            De 6 a 11 Pontos - Considerar Atendimento Domiciliar
                            Multiprofissional (inclui procedimentos pontuais, desde
                            que não exclusivos)
                          </li>
                          <br/>

                          <li>
                            De 12 a 17 Pontos - Considerar Internação Domiciliar 12h
                          </li>
                          <br/>

                          <li>
                            18 ou mais Pontos - Considerar Internação Domiciliar 24h
                          </li>
                          <br/>
                        </ul>
                      </div>
                    </Popover>
                  </div>

                  {documentGroup?.fields?.map((field: any, index: number) => {
                    if (field.step === 3) {

                      const getKatz = (option: any, score: number) => {
                        option.selected = false
                        if (option.value === '0') {
                          if (score > 4) {
                            option.selected = true
                          }
                        } else if (option.value === '1') {
                          if (score >= 3 && score <= 4) {
                            option.selected = true
                          }
                        } else if (option.value === '2') {
                          if (score <= 2) {
                            option.selected = true
                          }
                        } else {
                          option.selected = false
                        }
                        return option
                      };

                      return (
                        <QuestionSection key={`question_${field._id}_${index}`}>

                          {(field.description === '3. KATZ (se pediatria, considerar dependência total)') ? (
                            <>
                              <QuestionTitle>{field.description}</QuestionTitle>
                              <RadioGroup
                                onChange={(e) => {
                                  selectOption(field._id, e.target.value);
                                }}
                              >
                                {field.options.map((option: any, index: number) => (
                                  <>
                                    {/*{console.log(option)}*/}
                                    <FormControlLabel
                                      key={`option_${field._id}_${index}`}
                                      value={getKatz(option, steps[0].score.total)}
                                      control={
                                        <Radio
                                          color="primary"
                                          checked={option?.selected}
                                        />
                                      }
                                      label={option.text}
                                      checked={option?.selected}
                                    />
                                  </>
                                ))}
                              </RadioGroup>
                            </>
                          ) : (
                            <>
                              <QuestionTitle>{field.description}</QuestionTitle>
                              <RadioGroup
                                onChange={(e) => {
                                  selectOption(field._id, e.target.value);
                                }}
                              >
                                {field.options.map((option: any, index: number) => (
                                  <>
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
                                      checked={option?.selected}
                                    />
                                  </>
                                ))}
                              </RadioGroup>
                            </>
                          )}
                        </QuestionSection>
                      );
                    }
                  })}

                  <ScoreTotalContent>
                    <ScoreLabel>PONTUAÇÃO FINAL:</ScoreLabel>
                    <ScoreTotal>
                      {steps[currentStep].score.total} -{" "}
                      {steps[currentStep].score.complexity}
                    </ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}

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
                    disabled={currentStep === (steps.length - 1)}
                    background="success"
                    type="submit"
                    onClick={handleNextStep}
                  >
                    Próximo
                  </Button>
                )}
              </ButtonsContent>
            </FormContent>
          </>
        )}

      </Container>
    </Sidebar>
  );
}
