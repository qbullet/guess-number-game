import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors'

export default function Header(props) {

  return (
    <View style={ styles.container }>
      <Text style={ styles.titleText }>{ props.title }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  titleText: {
    color: 'black',
    fontSize: 24,
    textTransform: 'capitalize'
  }
})