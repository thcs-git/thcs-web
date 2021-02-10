import React, { ReactChild, ReactChildren } from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

interface AuxProps {
  children: ReactChild | ReactChildren;
}

export default function PDFQuestion({ children }: AuxProps) {

  return (
    <Text style={styles.title}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#16679A',
    fontSize: 14,
    marginBottom: 15,
  },
});
