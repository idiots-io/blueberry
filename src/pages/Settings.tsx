import React from 'react'
import {
  View,
  Image,
  Switch,
  StyleSheet,
  Text,
  Animated,
  TouchableHighlight,
  Dimensions,
} from 'react-native'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import SettingPicker from '../components/SettingPicker'
import { connect } from 'react-redux'
import { Action } from '../reducers'
import { mainColor, subColor, fontColor } from '../config'
import { toggleAutoStart, toggleSoundMode } from '../actions/settings'

namespace Settings {
  export interface Props {
    workInterval: string
    breakTime: string
    completeSound: string
    autoStart: boolean
    isSoundMode: boolean
    toggleSoundMode: (input: boolean) => Action
    toggleAutoStart: (input: boolean) => Action
  }
  export interface State {
    range: string[]
    type: string
    picker: boolean
    isSoundMode: boolean
    autoStart: boolean
    offSet: any
    currentValue: string
  }
}

class Settings extends React.Component<Settings.Props, Settings.State> {
  constructor(props) {
    super(props)
    const deviceHeight = Dimensions.get('window').height

    this.state = {
      range: [],
      picker: false,
      autoStart: true,
      isSoundMode: true,
      offSet: new Animated.Value(deviceHeight),
      type: '',
      currentValue: '',
    }
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        {focused ? (
          <Image
            source={require('../assets/Settings/setting_active.png')}
            style={{ height: 30, width: 30, marginTop: 7 }}
          />
        ) : (
          <Image
            source={require('../assets/Global/setting_default.png')}
            style={{ height: 24, width: 24, marginTop: 5 }}
          />
        )}
      </View>
    ),
  }

  changeSoundOn = (): void => {
    this.props.isSoundMode
      ? this.props.toggleSoundMode(false)
      : this.props.toggleSoundMode(true)
  }
  changeAutoStart = (): void => {
    this.props.autoStart
      ? this.props.toggleAutoStart(false)
      : this.props.toggleAutoStart(true)
  }

  isBlueberryTimePickerMode = (): void => {
    for (let i = 1; i < 13; i++) {
      this.state.range.push(`${i * 5}분`)
    }
    this.setState({
      picker: true,
      type: '블루베리 시간',
      currentValue: this.props.workInterval,
      range: this.state.range,
    })
  }

  isBreakTimePickerMode = (): void => {
    for (let i = 1; i < 13; i++) {
      this.state.range.push(`${i * 5}분`)
    }
    this.setState({
      picker: true,
      type: '쉬는 시간',
      currentValue: this.props.breakTime,
      range: this.state.range,
    })
  }

  isSoundPickerMode = (): void =>
    this.setState({
      picker: true,
      type: '블루베리 완료 소리',
      currentValue: this.props.completeSound,
      range: ['Alarm clock', 'Bottles', 'Chimes', 'Jungle'],
    })

  render() {
    return (
      <PageLayout statusBarBackgroundColor={'rgb(217, 217, 217)'}>
        <Header />
        <View
          style={{
            paddingHorizontal: 15,
            backgroundColor: 'white',
            paddingTop: 20,
          }}
        >
          <Image source={require('../assets/Settings/sectionFirst.png')} />
        </View>
        <View style={styles.listItemWrapper}>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>블루베리 시간</Text>
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.isBlueberryTimePickerMode}
              disabled={this.state.picker}
            >
              <Text style={styles.countText}>{this.props.workInterval}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>쉬는 시간</Text>
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.isBreakTimePickerMode}
              disabled={this.state.picker}
            >
              <Text style={styles.countText}>{this.props.breakTime}</Text>
            </TouchableHighlight>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              paddingTop: 20,
            }}
          >
            <Image source={require('../assets/Settings/sectionSecond.png')} />
          </View>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>블루베리 진행 소리 on/off</Text>
            </View>
            <Switch
              onTintColor={mainColor.default}
              onValueChange={this.changeSoundOn}
              value={this.props.isSoundMode}
              style={{ height: 20 }}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>블루베리 자동 진행</Text>
            </View>
            <Switch
              onTintColor={mainColor.default}
              onValueChange={this.changeAutoStart}
              value={this.props.autoStart}
              style={{ height: 20 }}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>블루베리 완료 소리</Text>
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.isSoundPickerMode}
              disabled={this.state.picker}
            >
              <Text style={styles.countText}>{this.props.completeSound}</Text>
            </TouchableHighlight>
          </View>
        </View>
        {this.state.picker ? (
          <SettingPicker
            type={this.state.type}
            range={this.state.range}
            currentValue={this.state.currentValue}
            offSet={this.state.offSet}
            closeModal={(): void =>
              this.setState({
                picker: false,
                range: [],
              })
            }
          />
        ) : null}
      </PageLayout>
    )
  }
}

const styles = StyleSheet.create({
  listItemWrapper: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  countWrapper: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 16,
    color: fontColor.blue,
  },
  listItem: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    // borderBottomWidth: 0,
    borderTopWidth: 1,
    borderColor: subColor.pale,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: fontColor.dark,
  },
})

export default connect(
  state => ({
    workInterval: state.app.settings.workInterval.value,
    breakTime: state.app.settings.breakTime.value,
    completeSound: state.app.settings.completeSound.value,
    autoStart: state.app.settings.autoStart.value,
    isSoundMode: state.app.settings.isSoundMode.value,
  }),
  dispatch => ({
    toggleSoundMode: boolean => dispatch(toggleSoundMode(boolean)),
    toggleAutoStart: boolean => dispatch(toggleAutoStart(boolean)),
  }),
)(Settings)
