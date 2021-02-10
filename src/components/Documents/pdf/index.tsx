import React, { ReactElement } from 'react';
import { PDFViewer, Page, Document, StyleSheet, Font } from '@react-pdf/renderer';

import HeaderPrintComponent from './components/header';
import BodyPrintComponent from './components/body';
import FooterPrintComponent from './components/footer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingBottom: 65,
  },
});

interface IPrintProps {
  info: {
    author: string;
    title: string;
  },
  header: ReactElement;
  body: ReactElement;
  footer: ReactElement;
}

export default function PDFComponent(props: IPrintProps) {
  return (
    <PDFViewer style={{ width: `100%`, position: 'absolute', top: 0, left: 0, height: '100vh' }}>
      <Document  {...props.info}>
        <Page size="A4" style={styles.page}>
          <HeaderPrintComponent>
            {props.header}
          </HeaderPrintComponent>

          <BodyPrintComponent>
            {props.body}
          </BodyPrintComponent>

          <FooterPrintComponent>
            {props.footer}
          </FooterPrintComponent>
        </Page>
      </Document>
    </PDFViewer>
  );
}
