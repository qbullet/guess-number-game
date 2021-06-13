import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../constants/Colors';

export default function NumberContainer (props) {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text style={ styles.numberDisplay }>{ props.children }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.info,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 32,
    marginVertical: 8
  },
  numberDisplay: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: 'bold'
  }
});
