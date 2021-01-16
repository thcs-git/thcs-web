import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Container, StepLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../store';

import { loadRequest as getDocumentGroup } from '../../../../store/ducks/documentGroups/actions';
import { DocumentGroupInterface } from '../../../../store/ducks/documentGroups/types';

import { createDocumentRequest } from '../../../../store/ducks/documents/actions';

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

export default function Nead(props: RouteComponentProps<IPageParams>) {
  const steps = [{ title: 'Grupo 1', score: 0 }, { title: 'Grupo 2', score: 0 }, { title: 'Grupo 3', score: 0 }, { title: 'Escore de Katz', score: 0 }];
  const id = '5ff65469b4d4ac07d186e99f';

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
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState<String[]>([]);

  useEffect(() => {
    dispatch(getDocumentGroup({ _id: id }))
    dispatch(loadCareById(params.id));
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

  const handleNextStep = useCallback(() => {
    setCurrentStep(prevState => (prevState + 1))
  }, [currentStep]);

  const handleBackStep = useCallback(() => {
    setCurrentStep(prevState => (prevState - 1))
  }, [currentStep]);

  const handleNavigateStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [currentStep]);

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
  }, [selected, documentGroup]);

  const calculateScore = useCallback(() => {

  }, []);

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

              {documentGroup.fields.map((field: any, index: number) => {
                if (field.step === 0) {
                  return (
                    <QuestionSection key={`question_${field._id}_${index}`}>
                      <QuestionTitle>{field.description}</QuestionTitle>
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

              {documentGroup.fields.map((field: any, index: number) => {
                if (field.step === 1) {
                  return (
                    <QuestionSection key={`question_${field._id}_${index}`}>
                      <QuestionTitle>{field.description}</QuestionTitle>
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

              {documentGroup.fields.map((field: any, index: number) => {
                if (field.step === 2) {
                  return (
                    <QuestionSection key={`question_${field._id}_${index}`}>
                      <QuestionTitle>{field.description}</QuestionTitle>
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
                    </QuestionSection>
                  );
                }
              })}

              <ScoreTotalContent>
                <ScoreLabel>PONTUAÇÃO FINAL:</ScoreLabel>
                <ScoreTotal>0</ScoreTotal>
              </ScoreTotalContent>
            </>
          )}

          {/* Score de Katz */}
          {currentStep === 3 && (
            <>
              <StepTitle>Atividades</StepTitle>

              {documentGroup.fields.map((field: any, index: number) => {
                if (field.step === 3) {
                  return (
                    <QuestionSection key={`question_${field._id}_${index}`}>
                      <QuestionTitle>{field.description}</QuestionTitle>
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
                    </QuestionSection>
                  );
                }
              })}

              <ScoreTotalContent>
                <ScoreLabel>PONTUAÇÃO KATZ:</ScoreLabel>
                <ScoreTotal>0</ScoreTotal>
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
