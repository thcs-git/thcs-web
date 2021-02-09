import React from 'react';
import { Image, View, StyleSheet } from '@react-pdf/renderer';

import SollarLogo from '../../../../../assets/img/sollar-logo-white.png';

const styles = StyleSheet.create({
  header: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#16679A',
    // color: 'white',
    height: 100,
    marginBottom: 60
  }
});


const HeaderPrintComponent = (props: any) => (
  <View style={styles.header} fixed>
    <View>
      {props.children}
    </View>
  </View>
);

export default HeaderPrintComponent;
