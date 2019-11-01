import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import Card from "../components/Card";
import Color from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
const StartGameScreen = props => {
  const [ enterValue, setEnterValue ] = useState('');

  const [confirmed, setConfirmed] = useState(false);
  
  const [selectedNumber, setSelectedNumber] = useState(0);


  const numberHandler = inputText => {
    setEnterValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler =() => {
      setEnterValue('');
      setConfirmed(false);
  }


 const confirmInputHandler = () => {
     const choseNumber = parseInt(enterValue);
     if (isNaN(choseNumber ) || choseNumber <= 0 || choseNumber > 99) {
         Alert.alert('Invalid number!', 'Number has to be a number 1 and 99', [{text: 'Oky', style:'destructive', onPress: resetInputHandler}]);
     }
      setConfirmed(true);
      setSelectedNumber(choseNumber);
      setEnterValue('');
      Keyboard.dismiss();
  }


  let confirmedOutput;

  if (confirmed) {
      confirmedOutput = (
          <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <Button title='Start Game'/>
          </Card>
      );
  }
  

  return (
    <TouchableWithoutFeedback onPress = {() => {
        Keyboard.dismiss();
    }}>
      <View style={styles.screen}>
        <Text>The Game Screen</Text>

        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>

          <Input
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={numberHandler}
            value={enterValue}
            maxLength={2}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" color={Color.accent} onPress={resetInputHandler} />
            </View>

            <View style={styles.button}>
              <Button
                title="Confirm"
                color={Color.primary}
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>

           {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },

  inputContainer: {
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  input: {
    width: "80%",
    textAlign: "center"
  },
  button: {
    width: 100
  },
  summaryContainer:{
      marginTop: 20,
      alignItems: 'center'
  }
});

export default StartGameScreen;
