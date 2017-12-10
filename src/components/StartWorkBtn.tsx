import React from 'react'
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native'

const StartTimerBtn = ({ onPress = () => {} }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <ImageBackground
      style={styles.wrapper}
      source={require('../assets/Timer/startBtn.png')}>
      <Text style={styles.text}>시작하기</Text>
    </ImageBackground>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    width: 226,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperImage: {
    width: 113,
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 17
  }
})

export default StartTimerBtn;
