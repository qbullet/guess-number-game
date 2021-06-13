import React, { useState } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Button, 
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'

import Colors from '../constants/Colors'
import Card from '../components/Card'
import TextInputCustom from '../components/TextInputCustom'
import NumberContainer from '../components/NumberContainer'
import colors from '../constants/Colors'

const inputValidator = (number) => !isNaN(number) && number > 0 && number <= 99

export default function StartScreen (props) {
  const [enterValue, setEnteredValue] = useState('')
  const [confirmed, setConfirmState] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()
  
  const numberInputHandler = (inputText) => {
    const text = inputText.replace(/[^0-9]/g, '')
    setEnteredValue(text)
  }

  const screenPress = () => {
    Keyboard.dismiss()
  }

  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmState(false)
    setSelectedNumber()
  }

  const confirmInputHandler = () => {
    const chosenNumber = +enterValue
    
    if (!inputValidator(chosenNumber)) {
      Alert.alert(
        'Invalid number',
        'Number must be a number between 1 and 99',
        [{ text: 'OK', style: 'destructive', onPress: resetInputHandler }]
      )
      return
    }

    setConfirmState(true)
    setSelectedNumber(+chosenNumber)
    setEnteredValue('')
    Keyboard.dismiss()
  }

  const confirmComputed = (confirmed) => {
    let result = null
    if (confirmed) {
      result = (
        <Card style={ styles.summaryBox }>
          <Text>CHOSEN NUMBER</Text>
          <NumberContainer >{ selectedNumber }</NumberContainer>
          <Button 
            color={ colors.primary }
            title="START NEW GAME"
            onPress={ () => props.onStart(selectedNumber) }/>
        </Card>
      )
    }

    return result
  }

  const confirmText = confirmComputed(confirmed)

  return (
    <TouchableWithoutFeedback onPress={ screenPress }>
      <View style={ styles.screen }>
        <Text style={ styles.welcomeText }>Start a New Game !!</Text>
        <Card style={ styles.inputContainer }>
          <Text>Select a number</Text>
          <TextInputCustom 
            style={ styles.numberInput }
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enterValue} />
          <View style={ styles.actionContainer }>
            <View style={ styles.actionButton }>
              <Button 
                title="RESET"
                color={ Colors.error }
                onPress={ resetInputHandler } />
            </View>
            <View style={ styles.actionButton }>
              <Button
                title="CONFIRM"
                color={ Colors.primary }
                onPress={ confirmInputHandler }/>
            </View>
          </View>
        </Card>
        { confirmText }
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  actionContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },
  actionButton: {
    width: 100
  },
  numberInput: {
    width: '80%',
    fontSize: 18,
    textAlign: 'center',
  },
  summaryBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  }
})
