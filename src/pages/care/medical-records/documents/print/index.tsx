import React, { useCallback, useEffect, useState } from 'react';
import { Text, Image, View } from '@react-pdf/renderer';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicationState } from '../../../../../store';
import { loadDocumentRequest as getDocumentById, loadCareById } from '../../../../../store/ducks/cares/actions';
import { DocumentGroupFields, DocumentGroupFiledsOptions } from '../../../../../store/ducks/cares/types';

import { formatDate } from '../../../../../helpers/date';

import PDFComponent from '../../../../../components/Documents/pdf';
import CheckOption from '../../../../../components/Documents/pdf/components/body/components/CheckOption';
import Question from '../../../../../components/Documents/pdf/components/body/components/Question';
import QuestionTitle from '../../../../../components/Documents/pdf/components/body/components/Question/Title';

interface IPageParams {
  id: string;
  documentId: string;
};

export default function PrintDocument(props: RouteComponentProps<IPageParams>) {
  const { params } = props.match;

  const dispatch = useDispatch();
  const careState = useSelector((state: ApplicationState) => state.cares);

  useEffect(() => {
    dispatch(loadCareById(params.id));

    if (params?.documentId) {
      dispatch(getDocumentById(params.documentId));
    }
  }, []);

  useEffect(() => console.log('careState', careState), [careState]);

  const handleOptionsAnswer = useCallback((optionId: string): boolean => {
    const { document } = careState;

    const founded = document.fields.find((field: any) => field.option_id === optionId);

    return !!founded;

  }, [careState.document]);

  const handleTextAnswer = useCallback((fieldId: string): boolean => {
    const { document } = careState;

    const founded = document.fields.find((field: any) => field._id === fieldId);

    return (founded) ? founded.value : ``;

  }, [careState.document]);


  const renderHeader = useCallback(() => (
    <View wrap>
      <Text style={{ backgroundColor: '#16679A', color: 'white', textAlign: 'center', marginBottom: 10, padding: 15 }}>{careState?.document?.document_group_id?.name || ``}</Text>
      <View style={{ fontSize: 11, paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>Paciente: {careState?.data?.patient_id?.name}</Text>
        <Text>Data de Nascimento: {careState?.data?.patient_id?.birthdate ? formatDate(`${careState?.data?.patient_id?.birthdate}`, 'DD/MM/YYYY') : ``}</Text>
        <Text>Prestador: {careState?.document?.created_by?.name}</Text>
        <Text>Feito em: {formatDate(`${careState?.document?.created_at}`, 'DD/MM/YYYY HH:mm:ss')}</Text>
      </View>
    </View>
  ), [careState.document]);

  return (
    <PDFComponent
      info={{
        author: careState.document.created_by,
        title: careState?.document?.document_group_id?.name
      }}
      header={renderHeader()}
      body={
        <View style={{ paddingRight: 20 }} wrap>
          {careState?.document?.document_group_id?.fields && careState?.document?.document_group_id?.fields.map((field: DocumentGroupFields, index: number) => (
            <Question key={`question_${index}`}>
              <View wrap>
                {(field.type === 'radio' || field.type === 'check') && (
                  field.options && field?.options.map((option: DocumentGroupFiledsOptions, index: number) => {
                    if (index === 0) {
                      return (
                        <View key={`option_${option._id}`} wrap>
                          <QuestionTitle>{field.description || ``}</QuestionTitle>
                          <CheckOption label={option.text || ``} checked={handleOptionsAnswer(option._id || ``)} />
                        </View>
                      )
                    } else {
                      return (
                        <View key={`option_${option._id}`} wrap>
                          <CheckOption label={option.text || ``} checked={handleOptionsAnswer(option._id || ``)} />
                        </View>
                      );
                    }
                  }
                  )
                )}

                {(field.type === 'text' || field.type === 'textarea') && (
                  <>
                    <QuestionTitle>{field.description || ``}</QuestionTitle>
                    <Text style={{ textAlign: 'justify' }}>{handleTextAnswer(field?._id || ``)}</Text>
                  </>
                )}
              </View>
            </Question>
          ))}
        </View>
      }
      footer={<Text>Footer 2021</Text>}
    />
  );
}
