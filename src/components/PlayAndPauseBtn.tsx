import React from 'react';
import {
  StyleSheet,
  ImageStyle,
  Image,
  TouchableOpacity
} from 'react-native';

const PlayBtn = ({ pause = false, onPress = () => {} }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    {
      pause ?
      <Image
        style={styles.btnWrapper}
        source={require('../assets/Timer/pause.png')} />
      :
      <Image
        style={styles.btnWrapper}
        source={require('../assets/Timer/playBtn.png')} />
    }
  </TouchableOpacity>
)

interface StyleTypes {
  btnWrapper: ImageStyle
}
const styles = StyleSheet.create<StyleTypes>({
  btnWrapper: {

  }
})

export default PlayBtn;