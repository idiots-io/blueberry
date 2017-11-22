import React from 'react'
import {
  Picker,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableHighlight,
  View,
  Text,
} from 'react-native'
import { subColor, mainColor } from '../config'

namespace SettingPicker {
  export interface Props {
    closeModal: any
    updateValue: any
    select: any
    updateTime: any
    time: any
    offSet: any
  }
  export interface State {
    opacity: any
  }
}

class SettingPicker extends React.Component<
  SettingPicker.Props,
  SettingPicker.State
> {
  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0),
    }
  }
  componentDidMount() {
    Animated.timing(
      this.props.offSet, // The animated value to drive
      {
        toValue: 80, // Animate to opacity: 1 (opaque)
        duration: 500, // Make it take a while
      },
    ).start() // Starts the animation

    Animated.timing(
      this.state.opacity, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 800, // Make it take a while
      },
    ).start() // Starts the animation
  }

  closeModal() {
    // const deviceHeight = Dimensions.get('window').height
    Animated.timing(this.props.offSet, {
      toValue: 100,
      duration: 500,
    }).start(this.props.closeModal)
  }

  updateAndCloseModal() {
    const deviceHeight = Dimensions.get('window').height
    Animated.timing(this.props.offSet, {
      toValue: deviceHeight,
      duration: 500,
    }).start(this.props.updateValue)
    // this.props.select
  }

  render() {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.props.offSet }],
          opacity: this.state.opacity,
        }}
      >
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableHighlight
            onPress={() => this.closeModal()}
            underlayColor="transparent"
          >
            <Text>취소</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.updateAndCloseModal()}
            underlayColor="transparent"
          >
            <Text>선택</Text>
          </TouchableHighlight>
        </View>
        <Picker
          selectedValue={this.props.select}
          onValueChange={this.props.updateTime}
          style={styles.picker}
        >
          {this.props.time.map((time, i) => (
            <Picker.Item label={time} value={time} key={i} />
          ))}
        </Picker>
      </Animated.View>
    )
  }
}

// const SettingPicker = ({ time, select, updateTime, closeModal }) => (
//   <SlideUp>
//     <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
//       <TouchableHighlight onPress={closeModal} underlayColor="transparent">
//         <Text>취소</Text>
//       </TouchableHighlight>
//       <TouchableHighlight onPress={closeModal} underlayColor="transparent">
//         <Text>선택</Text>
//       </TouchableHighlight>
//     </View>
//     <Picker
//       selectedValue={select}
//       onValueChange={updateTime}
//       style={styles.picker}
//     >
//       {time.map((time, i) => <Picker.Item label={time} value={time} key={i} />)}
//     </Picker>
//   </SlideUp>
// )
const styles = StyleSheet.create({
  picker: {
    backgroundColor: subColor.light,
  },
})

export default SettingPicker
