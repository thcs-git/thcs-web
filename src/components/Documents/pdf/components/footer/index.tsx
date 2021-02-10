import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  }
});


const FooterPrintComponent = (props: any) => (
  <View style={styles.footer} fixed>
    {props.children}
  </View>
);

export default FooterPrintComponent;
