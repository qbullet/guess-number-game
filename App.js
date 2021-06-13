import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import Header from './components/Header'
import StartScreen from './screens/StartScreen'
import GameScreen from './screens/GameScreen'
import OverScreen from './screens/OverScreen'

export default function App() {
  const [ chosenNumber, setChosenNumber] = useState()
  const [ guessRounds, setGuessRounds] = useState(0) 
  
  const startHandler = (inputNumber) => {
    setChosenNumber(inputNumber)
  }

  const gameOverHandler = (rounds) => {
    setGuessRounds(rounds)
  }

  const restartHandler = () => {
    setGuessRounds(0)
    setChosenNumber(null)
  }

  const screenCompute = (number, rounds) => {
    let result = <StartScreen onStart={startHandler} />
    
    if (number && rounds <= 0) {
      result = <GameScreen answer={chosenNumber} onGameOver={gameOverHandler}/>
    } else if (rounds > 0) {
      result = <OverScreen answer={chosenNumber} guessedRound={guessRounds} onRestart={restartHandler}/>
    }

    return result
  }

  const contents = screenCompute(chosenNumber, guessRounds)

  return (
    <View style={styles.screen}>
      <Header title="guess a number" />
      { contents }
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})
