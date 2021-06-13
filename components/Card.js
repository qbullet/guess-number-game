import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Card (props) {
  return (
    <View style={ { ...styles.container, ...props.style } }>{ props.children }</View>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 6,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  }
})
