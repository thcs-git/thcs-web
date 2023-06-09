import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Stepper,
  Step,
  StepButton,
  Grid,
  Popover,
  IconButton,
} from "@mui/material";
import { Help as HelpIcon } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";

import {
  loadCareById,
  actionDocumentGroupAbemidRequest,
  actionDocumentAbemidRequest,
  actionDocumentAbemidStoreRequest,
  actionDocumentAbemidUpdateRequest,
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
import { handleUserSelectedId } from "../../../../helpers/localStorage";

import { ButtonsContent, FormContent } from "./styles";
import { toast } from "react-toastify";
import _ from "lodash";
import ButtonComponent from "../../../../styles/components/Button";

interface IPageParams {
  id: string;
  documentId?: string;
}

interface IScore {
  total: number;
  complexity: string;
  status: string;
}

export default function Abemid(props: IPageParams) {
  const params = useParams();
  // const { state: routeState } = props.location;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const careState = useSelector((state: ApplicationState) => state.cares);
  const {
    documentGroupAbemid: documentGroupState,
    documentAbemid: documentState,
  } = careState;

  const [care, setCare] = useState<CareInterface>();
  const [documentGroup, setDocumentGroup] = useState<DocumentGroupInterface>({
    _id: "",
    name: "",
    description: "",
    fields: [],
    created_at: "",
    created_by: { _id: "" },
    updated_at: "",
    updated_by: { _id: "" },
  });
  const [document, setDocument] = useState<any>();
  const [steps, setSteps] = useState([
    {
      title: "KATZ",
      // finished: !!routeState.katzIsDone,
      score: { total: 0, complexity: "", status: "" },
    },
    {
      title: "Abemid",
      finished: false,
      score: { total: 0, complexity: "", status: "" },
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const [anchorHelpPopover, setHelpPopover] =
    React.useState<HTMLButtonElement | null>(null);
  const openHelpPopover = Boolean(anchorHelpPopover);

  const handleNextStep = useCallback(() => {
    let isError = null;

    if (isDone() || careState.data.capture?.status != "Em Andamento") {
    } else {
      isError = checkAllCurrentQuestionsAnswered(documentGroup, currentStep);
    }

    if (isError) return;

    window.scrollTo(0, 200);

    setCurrentStep((prevState) => prevState + 1);
  }, [currentStep, documentGroup]);

  const handleBackStep = useCallback(() => {
    setCurrentStep((prevState) => prevState - 1);
    window.scrollTo(0, 200);
  }, [currentStep]);

  const handleNavigateStep = useCallback(
    (step: number) => {
      setCurrentStep(step);
    },
    [currentStep]
  );

  const handleClickHelpPopover = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setHelpPopover(event.currentTarget);
  };

  const handleCloseHelpPopover = () => {
    setHelpPopover(null);
  };

  useEffect(() => {
    dispatch(actionDocumentGroupAbemidRequest());
    params.id && dispatch(loadCareById(params.id));

    if (params?.documentId) {
      dispatch(
        actionDocumentAbemidRequest({
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

      if (
        documentState?.success &&
        !documentState?.loading &&
        !documentState?.error
      ) {
        if (care?._id) {
          navigate(`/patient/capture/${care._id}/overview/`, {
            // success: true,
          });
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

  const checkAllCurrentQuestionsAnswered = useCallback(
    (localDocumentGroup: DocumentGroupInterface, localCurrentStep: number) => {
      const currentStepAnswer = localDocumentGroup?.fields?.filter(
        (field) => field.step === localCurrentStep
      );
      if (currentStep === 1) currentStepAnswer?.shift();
      const isAllQuestionAnswered = currentStepAnswer?.map((field) =>
        field?.options?.some((option) => option.hasOwnProperty("selected"))
      );
      const isError = isAllQuestionAnswered?.some((answered) => !answered);

      if (isError) {
        toast.error("Selecione ao menos uma alternativa por pergunta");
      }

      return isError;
    },
    [documentGroup, currentStep, documentGroupState]
  );

  const isDone = useCallback(() => {
    let documentObj = _.find(care?.documents_id, {
      document_group_id: { name: "ABEMID" },
    });
    return documentObj?.finished ? documentObj?.finished : false;
  }, [care]);

  const clearDocument = useCallback(() => {
    let documentGroupCopy = { ...documentGroup };

    documentGroupCopy?.fields?.map((field: any) => {
      field.options.map((option: any) => {
        option.selected = false;
      });
    });

    setDocumentGroup(documentGroupCopy);

    steps?.map((field: any) => {
      field.score.total = 0;
    });
  }, [documentGroup, steps]);

  const selectOption = useCallback(
    (field_id: string, option_id: string, multiple: boolean = false) => {
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
      countQuestionFive = 0;

    documentGroup?.fields?.map((field: any) => {
      if (field.step === currentStep) {
        field.options.map((option: any) => {
          if (option?.selected) {
            if (option.value === "5") {
              countQuestionFive++;
            }

            partialScore += parseInt(option.value);
          }
        });
      }
    });

    const getComplexity = (score: number) => {
      // Abemid
      if (currentStep === 1) {
        if (countQuestionFive === 1) {
          return "Média Complexidade";
        } else if (countQuestionFive > 1) {
          return "Alta Complexidade";
        } else if (score >= 8 && score <= 12) {
          return "Baixa Complexidade";
        } else if (score >= 13 && score <= 18) {
          return "Média Complexidade";
        } else if (score >= 19) {
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
          return "Dependência Parcial";
        } else {
          return "Independente";
        }
      } else {
        return "Não Identificado";
      }
    };

    const getStatus = (score: number) => {
      // if (score < 7) {
      //   return 'Não Elegível';
      // } else {
      //   return 'Elegível';
      // }
      return "";
    };

    let stepsCopy = steps;

    stepsCopy[currentStep].score = {
      total: partialScore,
      complexity: getComplexity(partialScore),
      status: getStatus(partialScore),
    };

    setSteps((prevState) => stepsCopy);
  }, [documentGroup, currentStep, steps[currentStep].score.total]);

  const handleFieldAnswer = useCallback(() => {
    let documentGroupCopy = { ...documentGroup };

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
    calculateScore();
  }, [documentGroup, document]);

  const getScore = useCallback(() => {
    let partialScore = 0,
      countQuestionFive = 0;

    documentGroup?.fields?.map((field: any) => {
      field.options.map((option: any) => {
        if (option?.selected) {
          if (option.value === "5") {
            countQuestionFive++;
          }
          partialScore += parseInt(option.value);
        }
      });
    });

    const getComplexity = (score: number) => {
      if (countQuestionFive === 1) {
        return "Média Complexidade";
      } else if (countQuestionFive > 1) {
        return "Alta Complexidade";
      } else if (score >= 8 && score <= 12) {
        return "Baixa Complexidade";
      } else if (score >= 13 && score <= 18) {
        return "Média Complexidade";
      } else if (score >= 19) {
        return "Alta Complexidade";
      } else {
        return "Atenção Domiciliar";
      }
    };

    return partialScore
      ? `${partialScore - steps[0].score.total} - ${getComplexity(
          partialScore - steps[0].score.total
        )}`
      : "0 - Atenção Domiciliar";
  }, [documentGroup]);

  const handleSubmit = useCallback(() => {
    let selecteds: any = [],
      complexitiesArray: any = [],
      statusArray: any = [];
    let complexity: string = "",
      status: string = "";

    const isError = checkAllCurrentQuestionsAnswered(
      documentGroup,
      currentStep
    );

    if (isError) return;

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
        document_group_id: documentGroup?._id || "",
        finished: true,
        canceled: false,
        fields: selecteds,
        complexity,
        status,
        created_by: { _id: handleUserSelectedId() || "" },
      };

      if (document?._id) {
        dispatch(
          actionDocumentAbemidUpdateRequest({
            ...createDocumentParams,
            _id: document._id,
          })
        );
      } else {
        dispatch(actionDocumentAbemidStoreRequest(createDocumentParams));
      }
    }
  }, [documentGroup, care, currentStep]);

  return (
    <Sidebar>
      {/* {careState.loading && <Loading/>} */}
      <Container>
        {care?.patient_id && (
          <>
            <h2>Paciente</h2>
            <PatientCard patient={care.patient_id} capture={care.capture} />
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
          <FormTitle style={{ margin: 0 }}>{documentGroup.name}</FormTitle>
          <IconButton
            aria-describedby={"popover_help_abemid"}
            onClick={handleClickHelpPopover}
            style={{ marginLeft: 10 }}
          >
            <HelpIcon style={{ color: "#ccc" }} />
          </IconButton>
          {!isDone() && careState.data.capture?.status === "Em Andamento" && (
            <>
              <ButtonComponent
                onClick={() => {
                  clearDocument();
                }}
                // background="primary"
              >
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
              <br />
              <ul>
                <li>
                  Ao obter 01 pontuação 5, o paciente migra automaticamente para
                  Média Complexidade;
                </li>

                <li>
                  Ao obter 02 ou mais pontuações 5, o paciente migra
                  automaticamente para Alta Complexidade, independente do total
                  de pontos obtidos (com cuidado).
                  <br />
                  Obs. A migração acima referida, ocorre independente dos pontos
                  totais obtidos
                </li>

                <li>
                  Em TODOS os itens de avaliação, EXCETO os relacionados a
                  coluna SUPORTE TERAPÊUTICO, os pontos NÃO se somam, SEMPRE
                  prevalecendo o item de MAIOR pontuação em decorrência da maior
                  COMPLEXIDADE
                </li>
              </ul>
              <br />

              <ul>
                <li>
                  Inferior a 07 pontos Paciente não elegível para Internação
                  Domiciliar
                </li>
                <li>De 08 a 12 pontos Baixa Complexidade</li>
                <li>De 13 a 18 pontos Média Complexidade</li>
                <li>Acima de 19 pontos Alta Complexidade</li>
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

        {careState.data.capture?.status != "Em Andamento" ? (
          <>
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
                          <RadioGroup style={{ width: "fit-content" }}>
                            {field.options.map((option: any, index: number) => (
                              <FormControlLabel
                                key={`option_${field._id}_${index}`}
                                value={option._id}
                                control={
                                  <Radio
                                    color="primary"
                                    checked={
                                      isDone() ? option?.selected : false
                                    }
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
                      {steps[currentStep].score.total
                        ? `${steps[currentStep].score.total} - ${steps[currentStep].score.complexity}`
                        : "0 - Dependente Total"}
                    </ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}
            </FormContent>
            <FormContent>
              {/* Grupo 1 */}
              {currentStep === 1 && (
                <>
                  {/*<StepTitle>Elegibilidade</StepTitle>*/}

                  {documentGroup?.fields?.map((field: any, index: number) => {
                    if (field.step === 1) {
                      const getKatz = (option: any, score: number) => {
                        option.selected = false;
                        if (option.value === "0") {
                          if (score > 4) {
                            option.selected = true;
                          }
                        } else if (option.value === "2") {
                          if (score >= 3 && score <= 4) {
                            option.selected = true;
                          }
                        } else if (option.value === "5") {
                          if (score <= 2) {
                            option.selected = true;
                          }
                        } else {
                          option.selected = false;
                        }
                        return option;
                      };

                      return (
                        <QuestionSection key={`question_${field._id}_${index}`}>
                          {field.description ===
                          "5. Grau de atividade da vida diária relacionada a cuidados técnicos" ? (
                            <>
                              <QuestionTitle>{field.description}</QuestionTitle>

                              {field.type === "radio" && (
                                <RadioGroup>
                                  {field.options.map(
                                    (option: any, index: number) => (
                                      <FormControlLabel
                                        key={`option_${field._id}_${index}`}
                                        value={getKatz(
                                          option,
                                          steps[0].score.total
                                        )}
                                        control={<Radio color="primary" />}
                                        label={option.text}
                                        checked={
                                          isDone() ? option?.selected : false
                                        }
                                      />
                                    )
                                  )}
                                </RadioGroup>
                              )}
                            </>
                          ) : (
                            <>
                              <QuestionTitle>{field.description}</QuestionTitle>

                              {field.type === "radio" && (
                                <RadioGroup>
                                  {field.options.map(
                                    (option: any, index: number) => (
                                      <FormControlLabel
                                        key={`option_${field._id}_${index}`}
                                        value={option._id}
                                        control={<Radio color="primary" />}
                                        label={option.text}
                                        checked={
                                          isDone() ? option?.selected : false
                                        }
                                      />
                                    )
                                  )}
                                </RadioGroup>
                              )}

                              {field.type === "check" && (
                                <FormGroup>
                                  {field.options.map(
                                    (option: any, index: number) => (
                                      <FormControlLabel
                                        key={`option_${field._id}_${index}`}
                                        value={option._id}
                                        control={
                                          <Checkbox
                                            color="primary"
                                            checked={
                                              isDone()
                                                ? option?.selected
                                                : false
                                            }
                                          />
                                        }
                                        label={option.text}
                                      />
                                    )
                                  )}
                                </FormGroup>
                              )}
                            </>
                          )}
                        </QuestionSection>
                      );
                    }
                  })}

                  <ScoreTotalContent>
                    <ScoreLabel>TOTAL DE PONTOS:</ScoreLabel>
                    <ScoreTotal>{getScore()}</ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}
            </FormContent>

            <FormContent>
              <ButtonsContent>
                <Button
                  // background="default"
                  onClick={() =>
                    navigate(`/patient/capture/${care?._id}/overview`)
                  }
                >
                  voltar
                </Button>
                <Button
                  disabled={currentStep === 0}
                  // background="default"
                  onClick={handleBackStep}
                >
                  Anterior
                </Button>

                {currentStep === steps.length - 1 ? (
                  <>
                    {careState.data.capture?.status === "Em Andamento" && (
                      <Button
                        //  background="primary"
                        onClick={handleSubmit}
                      >
                        Finalizar
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    disabled={currentStep === steps.length - 1}
                    // background="success"
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
                        <QuestionSection key={`question_${field._id}_${index}`}>
                          <QuestionTitle>{field.description}</QuestionTitle>
                          <RadioGroup
                            onChange={(e) =>
                              selectOption(field._id, e.target.value)
                            }
                            style={{ width: "fit-content" }}
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
                      {steps[currentStep].score.total
                        ? `${steps[currentStep].score.total} - ${steps[currentStep].score.complexity}`
                        : "0 - Dependente Total"}
                    </ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}
            </FormContent>
            <FormContent>
              {/* Grupo 1 */}
              {currentStep === 1 && (
                <>
                  {/*<StepTitle>Elegibilidade</StepTitle>*/}

                  {documentGroup?.fields?.map((field: any, index: number) => {
                    if (field.step === 1) {
                      const getKatz = (option: any, score: number) => {
                        option.selected = false;
                        if (option.value === "0") {
                          if (score > 4) {
                            option.selected = true;
                          }
                        } else if (option.value === "2") {
                          if (score >= 3 && score <= 4) {
                            option.selected = true;
                          }
                        } else if (option.value === "5") {
                          if (score <= 2) {
                            option.selected = true;
                          }
                        } else {
                          option.selected = false;
                        }
                        return option;
                      };

                      return (
                        <QuestionSection key={`question_${field._id}_${index}`}>
                          {field.description ===
                          "5. Grau de atividade da vida diária relacionada a cuidados técnicos" ? (
                            <>
                              <QuestionTitle>{field.description}</QuestionTitle>

                              {field.type === "radio" && (
                                <RadioGroup
                                  onChange={(e) =>
                                    selectOption(field._id, e.target.value)
                                  }
                                >
                                  {field.options.map(
                                    (option: any, index: number) => (
                                      <FormControlLabel
                                        key={`option_${field._id}_${index}`}
                                        value={getKatz(
                                          option,
                                          steps[0].score.total
                                        )}
                                        control={<Radio color="primary" />}
                                        label={option.text}
                                        checked={option?.selected}
                                      />
                                    )
                                  )}
                                </RadioGroup>
                              )}
                            </>
                          ) : (
                            <>
                              <QuestionTitle>{field.description}</QuestionTitle>

                              {field.type === "radio" && (
                                <RadioGroup
                                  onChange={(e) =>
                                    selectOption(field._id, e.target.value)
                                  }
                                >
                                  {field.options.map(
                                    (option: any, index: number) => (
                                      <FormControlLabel
                                        key={`option_${field._id}_${index}`}
                                        value={option._id}
                                        control={<Radio color="primary" />}
                                        label={option.text}
                                        checked={option?.selected}
                                      />
                                    )
                                  )}
                                </RadioGroup>
                              )}

                              {field.type === "check" && (
                                <FormGroup>
                                  {field.options.map(
                                    (option: any, index: number) => (
                                      <FormControlLabel
                                        key={`option_${field._id}_${index}`}
                                        value={option._id}
                                        onChange={(e) =>
                                          selectOption(
                                            field._id,
                                            option._id,
                                            true
                                          )
                                        }
                                        control={
                                          <Checkbox
                                            color="primary"
                                            checked={option?.selected ?? false}
                                          />
                                        }
                                        label={option.text}
                                      />
                                    )
                                  )}
                                </FormGroup>
                              )}
                            </>
                          )}
                        </QuestionSection>
                      );
                    }
                  })}

                  <ScoreTotalContent>
                    <ScoreLabel>TOTAL DE PONTOS:</ScoreLabel>
                    <ScoreTotal>{getScore()}</ScoreTotal>
                  </ScoreTotalContent>
                </>
              )}
            </FormContent>

            <FormContent>
              <ButtonsContent>
                <Button
                  // background="default"
                  onClick={() =>
                    navigate(`/patient/capture/${care?._id}/overview`)
                  }
                >
                  Cancelar
                </Button>
                <Button
                  disabled={currentStep === 0}
                  // background="default"
                  onClick={handleBackStep}
                >
                  Anterior
                </Button>

                {currentStep === steps.length - 1 ? (
                  <>
                    {careState.data.capture?.status === "Em Andamento" && (
                      <Button
                        //  background="primary"
                        onClick={handleSubmit}
                      >
                        Finalizar
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    disabled={currentStep === steps.length - 1}
                    // background="success"
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
