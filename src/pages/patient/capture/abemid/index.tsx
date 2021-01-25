import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Container, StepLabel, Radio, RadioGroup, FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';

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

import { ButtonsContent, FormContent } from './styles';

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
  const [score, setScore] = useState<IScore>({ total: 0, complexity: 'Sem Complexidade', status: '' });

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
      field.options.map((option: any) => {
        if (option?.selected) {
          if (option.value === 5) {
            countQuestionFive++;
          }

          partialScore += parseInt(option.value);
        }
      });
    });

    const getComplexity = (score: number) => {
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
    };

    const getStatus = (score: number) => {
      if (score < 7) {
        return 'Não Elegível';
      } else {
        return 'Elegível';
      }
    };

    setScore({ total: partialScore, complexity: getComplexity(partialScore), status: getStatus(partialScore) });

  }, [documentGroup]);

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
    let selecteds: any = [];

    documentGroup?.fields?.map((field: any) => {
      field.options.map((option: any) => {
        if (option?.selected) {
          selecteds.push({ _id: field._id, description: field.description, option_id: option._id, value: option.value })
        }
      })
    });

    if (care?.patient_id?._id && care?._id) {
      const createDocumentParams = {
        ...score,
        pacient_id: care.patient_id?._id,
        care_id: care?._id,
        document_group_id: documentGroup?._id || '',
        finished: true,
        canceled: false,
        fields: selecteds,
        created_by: { _id: '5e8cfe7de9b6b8501c8033ac' },
      };

      if (document?._id) {
        dispatch(actionDocumentAbemidUpdateRequest({ ...createDocumentParams, _id: document._id }));
      } else {
        dispatch(actionDocumentAbemidStoreRequest(createDocumentParams));
      }
    }

  }, [documentGroup, care]);

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

        <FormTitle>{documentGroup.name}</FormTitle>

        <FormContent>
          {documentGroup?.fields?.map((field: any, index: number) => (
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
          ))}

          <ScoreTotalContent>
            <ScoreLabel>PONTUAÇÃO KATZ:</ScoreLabel>
            <ScoreTotal>{score.total}</ScoreTotal>
          </ScoreTotalContent>

          <ButtonsContent>
            <Button
              background="default"
              onClick={() => history.push(`/patient/capture/${care?._id}/overview`)}
            >
              Cancelar
            </Button>
            <Button
              background="primary"
              onClick={handleSubmit}
            >
              Finalizar
            </Button>
          </ButtonsContent>
        </FormContent>

      </Container>
    </Sidebar >
  );
}