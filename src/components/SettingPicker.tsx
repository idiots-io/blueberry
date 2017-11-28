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
import { connect } from 'react-redux'
import { Action } from '../reducers'
import { changeSettingWithPicker } from '../actions/settings'

namespace SettingPicker {
  export interface Props {
    closeModal: any
    range: string[]
    offSet: any
    type: string
    currentValue: string
    changeSetting: (type: string, value: string) => Action
  }
  export interface State {
    opacity: any
    changeValue: string
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
      changeValue: this.props.currentValue,
    }
  }

  componentDidMount() {
    // slide animation
    Animated.timing(this.props.offSet, {
      toValue: -110,
      duration: 500,
    }).start()

    // opacity animation
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
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
    this.props.changeSetting(this.props.type, this.state.changeValue)
    const deviceHeight = Dimensions.get('window').height
    Animated.timing(this.props.offSet, {
      toValue: deviceHeight,
      duration: 500,
    }).start(this.props.closeModal)
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
          <Text style={{ color: fontColor.blue }}>{this.props.type}</Text>
          <TouchableHighlight
            onPress={() => this.updateAndCloseModal()}
            underlayColor="transparent"
          >
            <Text style={{ color: fontColor.blue }}>선택</Text>
          </TouchableHighlight>
        </View>
        <Picker
          selectedValue={this.state.changeValue}
          onValueChange={(e: any) =>
            this.setState({
              changeValue: e,
            })
          }
          style={styles.picker}
        >
          {this.props.range.map((time, i) => (
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
    zIndex: 100,
  },
  pickerUpperBar: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: subColor.default,
    borderTopColor: subColor.default,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowColor: 'black',
    shadowOffset: { height: -4, width: 0 },
  },
})

const mapDispatchToProps = (dispatch: any): any => {
  return {
    changeSetting: (type, value) =>
      dispatch(changeSettingWithPicker(type, value)),
  }
}

export default connect(null, mapDispatchToProps)(SettingPicker)
