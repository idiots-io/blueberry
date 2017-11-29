import React from 'react';
import {
  StyleSheet,
  ImageStyle,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';

namespace GiveUpTimerBtn {
  export interface Props {
    onPress?: () => void
    selected?: boolean
  }
  export interface State {
    selected: boolean
    showUpAnim: Animated.ValueXY
  }
}
class GiveUpTimerBtn extends React.Component<GiveUpTimerBtn.Props, GiveUpTimerBtn.State> {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      showUpAnim: new Animated.ValueXY(this.calculateXY(this.props.selected))
    }
  }

  calculateXY = (selected: boolean) => ({ x: Dimensions.get('window').width - 80, y: Dimensions.get('window').height/5 - (selected ? 59 : 30) })


  onPress = () => {
    Animated.spring(this.state.showUpAnim, {
        toValue: this.calculateXY(!this.state.selected)
    }).start();  
    this.setState({
      selected: !this.state.selected
    })
    this.props.onPress && this.props.onPress();
  }

  render() {
    return (
      <Animated.View
        style={{transform: this.state.showUpAnim.getTranslateTransform()}}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={this.onPress}>
          <Image
            style={styles.btnWrapper}
            source={require('../assets/Timer/giveUp.png')} />
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

interface StyleTypes {
  btnWrapper: ImageStyle
}
const styles = StyleSheet.create<StyleTypes>({
  btnWrapper: {

  }
})

export default GiveUpTimerBtn;