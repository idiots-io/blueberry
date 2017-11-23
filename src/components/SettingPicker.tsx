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
import { subColor, fontColor } from '../config'

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
    opacity: number
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
    // slide animation
    Animated.timing(this.props.offSet, {
      toValue: 20,
      duration: 500,
    }).start()

    // opacity animation
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 800,
    }).start()
  }

  closeModal = () => {
    const deviceHeight = Dimensions.get('window').height
    Animated.timing(this.props.offSet, {
      toValue: deviceHeight,
      duration: 500,
    }).start(this.props.closeModal)
  }

  updateAndCloseModal = () => {
    const deviceHeight = Dimensions.get('window').height
    Animated.timing(this.props.offSet, {
      toValue: deviceHeight,
      duration: 500,
    }).start(this.props.updateValue)
  }

  render() {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.props.offSet }],
          opacity: this.state.opacity,
        }}
      >
        <View style={styles.pickerUpperBar}>
          <TouchableHighlight
            onPress={() => this.closeModal()}
            underlayColor="transparent"
          >
            <Text style={{ color: fontColor.sub }}>취소</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.updateAndCloseModal()}
            underlayColor="transparent"
          >
            <Text style={{ color: fontColor.blue }}>선택</Text>
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

const styles = StyleSheet.create({
  picker: {
    backgroundColor: 'white',
  },
  pickerUpperBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: subColor.default,
    borderTopColor: subColor.default,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
})

export default SettingPicker
