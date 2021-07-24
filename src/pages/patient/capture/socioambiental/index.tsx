import React, {useState, useEffect, useCallback} from 'react';
import {useHistory, RouteComponentProps} from 'react-router-dom';
import {Container, StepLabel, Radio, RadioGroup, FormControlLabel, FormGroup, Checkbox} from '@material-ui/core';

import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../../../../store';

import {
  loadCareById,
  actionDocumentGroupSocioAmbientalRequest,
  actionDocumentSocioAmbientalRequest,
  actionDocumentSocioAmbientalStoreRequest,
  actionDocumentSocioAmbientalUpdateRequest,
  cleanAction
} from '../../../../store/ducks/cares/actions';
import {CareInterface, DocumentGroupInterface} from '../../../../store/ducks/cares/types';

import PatientCard from '../../../../components/Card/Patient';
import Loading from '../../../../components/Loading';
import Sidebar from '../../../../components/Sidebar';

import Button from '../../../../styles/components/Button';
import {
  FormTitle,
  QuestionSection,
  QuestionTitle,
  ScoreTotalContent,
  ScoreLabel,
  ScoreTotal
} from '../../../../styles/components/Form';
import {handleUserSelectedId} from '../../../../helpers/localStorage';

import {ButtonsContent, FormContent} from './styles';
import {toast} from 'react-toastify';
import _ from "lodash";
import ButtonComponent from "../../../../styles/components/Button";
import {HeaderContent} from "../../../care/overview/schedule/styles";

interface IPageParams {
  id: string;
  documentId?: string;
}

interface IScore {
  total: number;
  complexity: string;
  status: string;
}

export default function SocioAmbiental(props: RouteComponentProps<IPageParams>) {
  const {params} = props.match;

  const history = useHistory();
  const dispatch = useDispatch();

  const careState = useSelector((state: ApplicationState) => state.cares);
  const {documentGroupSocioAmbiental: documentGroupState, documentSocioAmbiental: documentState} = careState;

  const [care, setCare] = useState<CareInterface>();
  const [documentGroup, setDocumentGroup] = useState<DocumentGroupInterface>({
    _id: '',
    name: '',
    description: '',
    fields: [],
    created_at: '',
    created_by: {_id: ''},
    updated_at: '',
    updated_by: {_id: ''},
  });
  const [document, setDocument] = useState<any>();
  const [score, setScore] = useState<IScore>({total: 0, complexity: 'Sem Complexidade', status: ''});
  const [scoreSocial, setScoreSocial] = useState<IScore>({total: 0, complexity: 'Sem Complexidade', status: ''});
  const [scoreAmbiental, setScoreAmbiental] = useState<IScore>({total: 0, complexity: 'Sem Complexidade', status: ''});

  useEffect(() => {
    dispatch(actionDocumentGroupSocioAmbientalRequest());
    dispatch(loadCareById(params.id));

    if (params?.documentId) {
      dispatch(actionDocumentSocioAmbientalRequest({_id: params.documentId, care_id: params.id}));
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
          history.push(`/patient/capture/${care._id}/overview/`, {success: true});
        }
      }
    }
  }, [careState.documentSocioAmbiental]);

  useEffect(() => {
    if (document?._id) {
      handleFieldAnswer();
    }
  }, [document]);

  const selectOption = useCallback((field_id: string, option_id: string, multiple: boolean = false) => {
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
        })
      }
    });

    setDocumentGroup(documentGroupCopy);
    calculateScore();

  }, [documentGroup]);

  const clearDocument = useCallback(() => {
    let documentGroupCopy = {...documentGroup};

    documentGroupCopy?.fields?.map((field: any) => {
      field.options.map((option: any) => {
        option.selected = false
      })
    })

    setDocumentGroup(documentGroupCopy);

    scoreSocial.total = 0
    scoreAmbiental.total = 0
    score.total = 0
  }, [documentGroup, scoreSocial.total, scoreAmbiental.total, score.total]);

  const calculateScore = useCallback(() => {
    // let partialScore = 0, countQuestionReject = 0;
    let partialScoreSocial = 0, countQuestionRejectSocial = 0;
    let partialScoreAmbiental = 0, countQuestionRejectAmbiental = 0;

    let documentGroupSocial = documentGroup?.fields?.slice(0, 3)
    let documentGroupAmbiental = documentGroup?.fields?.slice(3, 6)

    // documentGroup?.fields?.map((field: any) => {
    //   field.options.map((option: any) => {
    //     if (option?.selected) {
    //       if (option.value < 0) {
    //         countQuestionReject++;
    //       } else {
    //         partialScore += parseInt(option.value);
    //       }
    //     }
    //   });
    // });

    documentGroupSocial?.map((field: any) => {
      field.options.map((option: any) => {
        if (option?.selected) {
          if (option.value < 0) {
            countQuestionRejectSocial++;
          } else {
            partialScoreSocial += parseInt(option.value);
          }
        }
      });
    });

    documentGroupAmbiental?.map((field: any) => {
      field.options.map((option: any) => {
        if (option?.selected) {
          if (option.value < 0) {
            countQuestionRejectAmbiental++;
          } else {
            partialScoreAmbiental += parseInt(option.value);
          }
        }
      });
    });

    const getStatus = (scoreSocial: number, scoreAmbiental: number) => {
      if (!(scoreSocial < 7 || countQuestionRejectSocial > 0) && !(scoreAmbiental < 2 || countQuestionRejectAmbiental > 0)) {
        return 'Elegível';
      } else {
        return 'Não Elegível';
      }
    };

    const getStatusSocial = (score: number) => {
      if (score < 7 || countQuestionRejectSocial > 0) {
        return 'Não Elegível';
      } else {
        return 'Elegível';
      }
    };

    const getStatusAmbiental = (score: number) => {
      if (score < 2 || countQuestionRejectAmbiental > 0) {
        return 'Não Elegível';
      } else {
        return 'Elegível';
      }
    };

    setScoreSocial({
      total: partialScoreSocial,
      complexity: 'Sem Complexidade',
      status: getStatusSocial(partialScoreSocial)
    });
    setScoreAmbiental({
      total: partialScoreAmbiental,
      complexity: 'Sem Complexidade',
      status: getStatusAmbiental(partialScoreAmbiental)
    });
    setScore({
      total: partialScoreSocial + partialScoreAmbiental,
      complexity: 'Sem Complexidade',
      status: getStatus(partialScoreSocial, partialScoreAmbiental)
    });

  }, [documentGroup]);

  const handleFieldAnswer = useCallback(() => {
    let documentGroupCopy = {...documentGroup};

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

  const handleDescription = useCallback((field) => {
    let description = field.description

    description = description.replace('4', '1')
    description = description.replace('5', '2')
    description = description.replace('6', '3')

    return description
  }, []);

  const isDone = useCallback(() => {
    let documentObj = _.find(care?.documents_id, {document_group_id: {name: 'Tabela Socioambiental'}});
    return documentObj?.finished ? documentObj?.finished : false
  }, [care]);

  const handleSubmit = useCallback(() => {
    let selecteds: any = [];

    const currentStepAnswer = documentGroup?.fields;
    const isAllQuestionAnswered = currentStepAnswer?.map(field => field?.options?.some(option => option.hasOwnProperty('selected')));
    const isError = isAllQuestionAnswered?.some(answered => !answered);

    // if (isError) {
    //   toast.error("Selecione ao menos uma alternativa por pergunta");
    //   return;
    // }

    documentGroup?.fields?.map((field: any) => {
      field.options.map((option: any) => {
        if (option?.selected) {
          selecteds.push({_id: field._id, description: field.description, option_id: option._id, value: option.value})
        }
      })
    });

    if (care?.patient_id?._id && care?._id) {
      const createDocumentParams = {
        ...score,
        patient_id: care.patient_id?._id,
        care_id: care?._id,
        document_group_id: documentGroup?._id || '',
        finished: true,
        canceled: false,
        fields: selecteds,
        created_by: {_id: handleUserSelectedId() || ''},
      };

      if (document?._id) {
        dispatch(actionDocumentSocioAmbientalUpdateRequest({...createDocumentParams, _id: document._id}));
      } else {
        dispatch(actionDocumentSocioAmbientalStoreRequest(createDocumentParams));
      }
    }

  }, [documentGroup, care]);

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

        {/*<FormTitle>{documentGroup.name}</FormTitle>*/}

        <HeaderContent>
          <FormTitle>Avaliação Social</FormTitle>
          {!isDone() && careState.data.capture?.status === 'Em Andamento' && (
            <>
              <div>
                <ButtonComponent onClick={() => {
                  clearDocument()
                }} background="primary">
                  Limpar Campos
                </ButtonComponent>
              </div>
            </>
          )}
        </HeaderContent>

        {careState.data.capture?.status != 'Em Andamento' ? (
          <>
            <FormContent>
              {documentGroup?.fields?.map((field: any, index: number) => (
                <>
                  <QuestionSection key={`question_${field._id}_${index}`}>

                    {(field.description === '4. Espaço físico') && (
                      <>
                        <ScoreTotalContent>
                          <ScoreLabel>SCORE:</ScoreLabel>
                          <ScoreTotal>
                            {
                              scoreSocial.total ? `${scoreSocial.total} - ${scoreSocial.status}` : '0 - Não Elegível'
                            }
                          </ScoreTotal>
                        </ScoreTotalContent>
                        <FormTitle>Avaliação Ambiental</FormTitle>
                      </>
                    )}

                    <QuestionTitle>{handleDescription(field)}</QuestionTitle>
                    {field.type === 'radio' && (
                      <RadioGroup style={{width: 'fit-content'}}>
                        {field.options.map((option: any, index: number) => (
                          <FormControlLabel
                            key={`option_${field._id}_${index}`}
                            value={option._id}
                            control={<Radio color="primary"/>}
                            label={option.text}
                            checked={isDone() ? option?.selected : false}
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
                            control={(
                              <Checkbox color="primary"
                                        checked={isDone() ? option?.selected : false}
                              />
                            )}
                            label={option.text}
                          />
                        ))}
                      </FormGroup>
                    )}
                  </QuestionSection>
                </>
              ))}

              <ScoreTotalContent>
                <ScoreLabel>SCORE:</ScoreLabel>
                <ScoreTotal>
                  {
                    scoreAmbiental.total ? `${scoreAmbiental.total} - ${scoreAmbiental.status}` : '0 - Não Elegível'
                  }
                </ScoreTotal>
              </ScoreTotalContent>

              <ButtonsContent>
                <Button
                  background="default"
                  onClick={() => history.push(`/patient/capture/${care?._id}/overview`)}
                >
                  Voltar
                </Button>

                {careState.data.capture?.status === 'Em Andamento' && (
                  <Button
                    background="primary"
                    onClick={handleSubmit}
                  >
                    Finalizar
                  </Button>
                )}
              </ButtonsContent>
            </FormContent>
          </>
        ) : (
          <>
            <FormContent>
              {documentGroup?.fields?.map((field: any, index: number) => (
                <>
                  <QuestionSection key={`question_${field._id}_${index}`}>

                    {(field.description === '4. Espaço físico') && (
                      <>
                        <ScoreTotalContent>
                          <ScoreLabel>SCORE:</ScoreLabel>
                          <ScoreTotal>
                            {
                              scoreSocial.total ? `${scoreSocial.total} - ${scoreSocial.status}` : '0 - Não Elegível'
                            }
                          </ScoreTotal>
                        </ScoreTotalContent>
                        <FormTitle>Avaliação Ambiental</FormTitle>
                      </>
                    )}

                    <QuestionTitle>{handleDescription(field)}</QuestionTitle>
                    {field.type === 'radio' && (
                      <RadioGroup style={{width: 'fit-content'}}
                                  onChange={e => selectOption(field._id, e.target.value)}>
                        {field.options.map((option: any, index: number) => (
                          <FormControlLabel
                            key={`option_${field._id}_${index}`}
                            value={option._id}
                            control={<Radio color="primary"/>}
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
                </>
              ))}

              <ScoreTotalContent>
                <ScoreLabel>SCORE:</ScoreLabel>
                <ScoreTotal>
                  {
                    scoreAmbiental.total ? `${scoreAmbiental.total} - ${scoreAmbiental.status}` : '0 - Não Elegível'
                  }
                </ScoreTotal>
              </ScoreTotalContent>

              <ButtonsContent>
                <Button
                  background="default"
                  onClick={() => history.push(`/patient/capture/${care?._id}/overview`)}
                >
                  Cancelar
                </Button>

                {careState.data.capture?.status === 'Em Andamento' && (
                  <Button
                    background="primary"
                    onClick={handleSubmit}
                  >
                    Finalizar
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
