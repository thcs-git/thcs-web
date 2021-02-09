import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 35,
    textAlign: 'justify',
    fontSize: 12,
  }
});


const BodyPrintComponent = (props: any) => (
  <View style={styles.body} wrap>
    {props.children}
  </View>
);

export default BodyPrintComponent;
