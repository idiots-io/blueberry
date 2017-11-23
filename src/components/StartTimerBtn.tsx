import React from 'react'
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

const StartTimerBtn = ({ onPress = () => {} }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <Image
      style={styles.btnWrapper}
      source={require('../assets/Timer/startBtn.png')}>
      <Text style={styles.text}>시작하기</Text>
    </Image>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
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
