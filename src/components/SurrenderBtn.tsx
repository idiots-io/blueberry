import React from 'react';
import {
  StyleSheet,
  ImageStyle,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

namespace GiveUpTimerBtn {
  export interface Props {
    onPress?: () => void
    selected?: boolean
  }
  export interface State {
    showUpAnim: Animated.ValueXY
  }
}
class GiveUpTimerBtn extends React.Component<GiveUpTimerBtn.Props, GiveUpTimerBtn.State> {
  constructor(props) {
    super(props);
    this.state = {
      showUpAnim: new Animated.ValueXY(this.calculateXY(this.props.selected))
    }
  }

  componentDidUpdate() {
    Animated.spring(this.state.showUpAnim, {
      toValue: this.calculateXY(this.props.selected)
    }).start();  
  }

  calculateXY = (selected: boolean) => ({ x: Dimensions.get('screen').width - 100, y: (selected ? Dimensions.get('screen').height - 56 : Dimensions.get('screen').height - 30) })


  onPress = () => {
    Animated.spring(this.state.showUpAnim, {
        toValue: this.calculateXY(this.props.selected)
    }).start();  
    this.props.onPress && this.props.onPress();
  }

  render() {
    return (
      <Animated.View
        style={{transform: this.state.showUpAnim.getTranslateTransform()}}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={this.onPress}>
          <ImageBackground
            style={styles.wrapper}
            source={require('../assets/Timer/giveUp.png')} />
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

interface StyleTypes {
  wrapper: ImageStyle
}
const styles = StyleSheet.create<StyleTypes>({
  wrapper: {
    height: 59,
    width: 50,
  }
})

export default GiveUpTimerBtn;