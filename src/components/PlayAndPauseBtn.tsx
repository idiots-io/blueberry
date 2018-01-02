import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

const PlayBtn = ({ mode, pause = false, onPress = () => {} }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    {
      !pause ?
      <ImageBackground
        style={styles.wrapper}
        source={
          mode === 'WORK' ?
          require('../assets/Timer/pauseOnWork.png')
          :
          require('../assets/Timer/pauseOnBreak.png')
        } />
      :
      <ImageBackground
        style={styles.wrapper}
        source={
          mode === 'WORK' ?
          require('../assets/Timer/playOnWork.png')
          :
          require('../assets/Timer/playOnBreak.png')
        } />
    }
  </TouchableOpacity>
)

interface StyleTypes {
  wrapper: ViewStyle
}
const styles = StyleSheet.create<StyleTypes>({
  wrapper: {
    height: 64,
    width: 64
  },
})

export default PlayBtn;