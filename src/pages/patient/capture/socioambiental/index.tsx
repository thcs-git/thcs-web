import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Container, StepLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';

import { loadRequest as getDocumentGroup } from '../../../../store/ducks/documentGroups/actions';
import { DocumentGroupInterface } from '../../../../store/ducks/documentGroups/types';
import { DocumentInterface, DocumentState } from '../../../../store/ducks/documents/types';

import { createDocumentRequest, loadRequest as getDocumentAction } from '../../../../store/ducks/documents/actions';

import { loadCareById } from '../../../../store/ducks/cares/actions';
import { CareInterface } from '../../../../store/ducks/cares/types';

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

export default function SocioAmbiental(props: RouteComponentProps<IPageParams>) {
  const id = '5ffd79012f5d2b1d8ff6bea3';

  const { params } = props.match;

  const history = useHistory();
  const dispatch = useDispatch();

  const documentGroupState = useSelector((state: ApplicationState) => state.documentGroups);
  const documentState = useSelector((state: ApplicationState) => state.documents);
  const careState = useSelector((state: ApplicationState) => state.cares);

  const [care, setCare] = useState<CareInterface>();
  const [documentGroup, setDocumentGroup] = useState<any>({
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
  const [selected, setSelected] = useState<String[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    dispatch(getDocumentGroup({ _id: id }))
    dispatch(loadCareById(params.id));

    if (params?.documentId) {
      dispatch(getDocumentAction({ _id: params.documentId }));
    }
  }, []);

  useEffect(() => {
    if (careState.data?._id) {
      setCare(careState.data);
    }
  }, [careState.data]);

  useEffect(() => {
    if (documentGroupState.data?._id) {
      setDocumentGroup(documentGroupState.data);
    }
  }, [documentGroupState])

  useEffect(() => {
    setDocument(documentState);
  }, [documentState]);

  useEffect(() => {
    if (
      documentState.success &&
      !documentState.loading &&
      !documentState.error
    ) {
      if (care?._id) {
        history.push(`/patient/capture/${care._id}/overview/`, { success: true })
      }
    }
  }, [documentState])

  const selectOption = useCallback((field_id: string, option_id: string) => {
    let documentGroupCopy = { ...documentGroup };

    documentGroupCopy.fields.map((field: any) => {
      if (field._id === field_id) {
        field.options.map((option: any) => {
          if (option._id === option_id) {
            option.selected = true;
          } else {
            option.selected = false;
          }
        })
      }
    });

    setDocumentGroup(documentGroupCopy);

    calculateScore();

  }, [selected, documentGroup]);

  const calculateScore = useCallback(() => {
    let partialScore = 0;

    documentGroup.fields.map((field: any) => {
      field.options.map((option: any) => {
        if (option?.selected) {
          partialScore += parseInt(option.value);
        }
      });
    });

    setScore(partialScore);

  }, [documentGroup]);

  const handleSubmit = useCallback(() => {
    let selecteds: any = [];

    documentGroup.fields.map((field: any) => {
      field.options.map((option: any) => {
        if (option?.selected) {
          selecteds.push({ _id: field._id, description: field.description, option_id: option._id, value: option.value })
        }
      })
    });

    if (care?.patient_id?._id && care?._id) {
      const createDocumentParams = {
        pacient_id: care.patient_id?._id,
        care_id: care._id,
        document_group_id: documentGroup._id,
        finished: true,
        canceled: false,
        fields: selecteds,
        created_by: { _id: '5e8cfe7de9b6b8501c8033ac' },
      };

      dispatch(createDocumentRequest(createDocumentParams));
    }

  }, [documentGroup, care]);

  const handleFieldAnswer = useCallback((option: any) => {
    let findField: any = false;

    if (document?.list?.fields) {
      findField = document.list.fields.find((f: any) => (
        option._id === f.option_id
      ));
    }

    return findField || option?.selected || false;

  }, [document])

  return (
    <Sidebar>
      {(documentGroupState.loading || careState.loading || documentState.loading) && (
        <Loading />
      )}
      <Container>

        {care?.patient_id && (
          <>
            <h2>Paciente</h2>
            <PatientCard patient={care.patient_id} />
          </>
        )}

        <FormTitle>{documentGroup.name}</FormTitle>

        <FormContent>
          {documentGroup.fields.map((field: any, index: number) => (
            <QuestionSection key={`question_${field._id}_${index}`}>
              <QuestionTitle>{field.description}</QuestionTitle>

              <RadioGroup onChange={e => selectOption(field._id, e.target.value)}>
                {field.options.map((option: any, index: number) => (
                  <FormControlLabel
                    key={`option_${field._id}_${index}`}
                    value={option._id}
                    control={<Radio color="primary" />}
                    label={option.text}
                    checked={handleFieldAnswer(option)}
                  />
                ))}
              </RadioGroup>
            </QuestionSection>
          ))}

          <ScoreTotalContent>
            <ScoreLabel>SCORE:</ScoreLabel>
            <ScoreTotal>{score}</ScoreTotal>
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
