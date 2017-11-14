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
      imageStyle={styles.image}
      style={styles.btnWrapper}
      source={require('../assets/Timer/startBtn.png')}>
      <Text style={styles.text}>시작하기</Text>
    </ImageBackground>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain'
  },
  btnWrapper: {
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 17
  }
})

export default StartTimerBtn;
