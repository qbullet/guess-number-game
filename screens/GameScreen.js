import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import Colors from '../constants/Colors'

const generateRandomNumber = (_min, _max, exclude) => {
  const min = Math.ceil(_min)
  const max = Math.floor(_max)
  let randomNumber = Math.floor(Math.random() * (max - min)) + min
  if (randomNumber === exclude) {
    randomNumber = generateRandomNumber(_min, _max, exclude)
  }

  return randomNumber
}

export default function GameScreen (props) {

  const [ currentGuess, setCurrentGuess ] = useState(generateRandomNumber(1, 100, props.answer))
  const [ round, setRound ] = useState(0)
  const currentLow = useRef(1)
  const currentHigh = useRef(100)
  const { answer, onGameOver } = props

  useEffect(() => {
    if (currentGuess === answer) {
      onGameOver(round)
    }
  }, [currentGuess, onGameOver, answer])

  const guessingHandler = (direction) => {
    const lowerImpossible = direction === 'lower' && currentGuess < answer
    const greaterImpossible = direction === 'greater' && currentGuess > answer

    if (lowerImpossible || greaterImpossible) {
      Alert.alert(
        'DON\'T CHEAT PLS',
        'Please select the right direction!',
        [{text: 'OK', style: 'destructive'}])
      return
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess - 1
    } else if (direction === 'greater') {
      currentLow.current = currentGuess + 1
    }

    const nextGuess = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextGuess)
    setRound((round) => round + 1)
  }

  return (
    <View style={ styles.container }>
      <Card style={ styles.cardContainer }>
        <Text>Opponent's guess</Text>
        <NumberContainer style={ styles.NumberContainer }>{ currentGuess }</NumberContainer>
        <View style={ styles.actionContainer }>
          <View style={ styles.actionButton }>
            <Button 
              title="LOWER"
              color={ Colors.error }
              onPress={ () => guessingHandler('lower') } />
          </View>
          <View style={ styles.actionButton }>
            <Button
              title="GREATER"
              color={ Colors.primary }
              onPress={ () => guessingHandler('greater') } />
          </View>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  cardContainer: {
    width: '80%',
    alignItems: 'center'
  },
  actionContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  actionButton: {
    width: 100
  },
  NumberContainer: {
    padding: 16
  }
})
