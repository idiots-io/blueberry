import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const SurrenderDialog = ({ onPressConfirm = () => {}, onPressCancel = () => {} }) => (
  <View style={styles.wrapper}>
    <TouchableOpacity activeOpacity={0.8} onPress={onPressConfirm}>
      <ImageBackground
        style={styles.btnWrapper}
        source={require('../assets/Timer/forgiveBtnL.png')}
      >
        <Text style={styles.text}>포기하기</Text>
      </ImageBackground>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.8} onPress={onPressCancel}>
      <ImageBackground
        style={styles.btnWrapper}
        source={require('../assets/Timer/forgiveBtnR.png')}
      >
        <Text style={styles.text}>포기는 없다!</Text>
      </ImageBackground>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row'
  },
  btnWrapper: {
    height: 39,
    width: 129,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 17
  }
})

export default SurrenderDialog;