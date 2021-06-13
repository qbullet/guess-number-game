import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Colors from '../constants/Colors';

export default function OverScreen (props) {

  return (
    <View style={ styles.container }>
      <Text> Game Over! </Text>
      <Text> Number of guessed round: { props.guessedRound } </Text>
      <Text> Answer is: { props.answer } </Text>
      <Button 
        title="RESTART"
        color={ Colors.warning }
        onPress={ props.onRestart } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
