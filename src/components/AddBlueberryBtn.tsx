import React from 'react'
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native'

const AddBlueberryBtn = ({ onPress = () => {} }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <ImageBackground
      style={styles.btnWrapper}
      source={require('../../src/assets/Todo/addBtn.png')}>
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
    backgroundColor: 'transparent',
    marginTop: 5,
    color: 'white',
    fontSize: 18
  }
})

export default AddBlueberryBtn
