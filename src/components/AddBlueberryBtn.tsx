import React from 'react'
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { fontFamily } from '../config'

const AddBlueberryBtn = ({ onPress = () => { } }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <ImageBackground
      style={styles.btnWrapper}
      source={require('../assets/Todo/addBtn.png')}>
      <Text style={styles.addTodoText}>+ 블루베리 추가하기</Text>
    </ImageBackground>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  btnWrapper: {
    height: 80,
    marginTop: -15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  addTodoText: {
    fontFamily: fontFamily.light,
    letterSpacing: -0.3,
    backgroundColor: 'transparent',
    marginTop: 5,
    color: 'white',
    fontSize: 17
  }
})

export default AddBlueberryBtn
