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
import { mainColor, subColor, fontColor } from '../config'

namespace Settings {
  export interface Props {}
  export interface State {
    time: any
    blueberryTimeSelect: any
    breakTimeSelect: any
    defaultBlueberryTime: any
    defaultBreakTime: any
    picker: boolean
    blueberryTimePicker: boolean
    soundOn: boolean
    offSet: any
  }
}

class Settings extends React.Component<Settings.Props, Settings.State> {
  constructor(props) {
    super(props)
    const deviceHeight = Dimensions.get('window').height

    const defaultTime = {
      blueberry: '25분',
      break: '5분',
    }

    this.state = {
      time: [],
      blueberryTimeSelect: defaultTime.blueberry,
      breakTimeSelect: defaultTime.break,
      defaultBlueberryTime: defaultTime.blueberry,
      defaultBreakTime: defaultTime.break,
      picker: false,
      blueberryTimePicker: false,
      soundOn: true,
      offSet: new Animated.Value(deviceHeight),
    }
    for (let i = 1; i < 13; i++) {
      this.setState({
        time: this.state.time.push(`${i * 5}분`),
      })
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
            style={{ height: 30, width: 30, marginTop: 12 }}
          />
        ) : (
          <Image
            source={require('../assets/Global/setting_default.png')}
            style={{ height: 24, width: 24, marginTop: 10 }}
          />
        )}
      </View>
    ),
  }

  updateBlueberryTime = time => {
    this.setState({ blueberryTimeSelect: time })
  }

  updateBreakTime = time => {
    this.setState({ breakTimeSelect: time })
  }

  changeSoundOn = () => {
    this.state.soundOn
      ? this.setState({ soundOn: false })
      : this.setState({ soundOn: true })
  }

  isBlueberryTimePickerMode = () =>
    this.setState({ picker: true, blueberryTimePicker: true })

  isBreakTimePickerMode = () => this.setState({ picker: true })

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
            >
              <Text style={styles.countText}>
                {this.state.blueberryTimeSelect}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>쉬는 시간</Text>
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.isBreakTimePickerMode}
            >
              <Text style={styles.countText}>{this.state.breakTimeSelect}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>블루베리 진행 소리 on/off</Text>
            </View>
            <Switch
              onTintColor={mainColor.default}
              onValueChange={this.changeSoundOn}
              value={this.state.soundOn}
              style={{ height: 20 }}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>블루베리 완료 소리</Text>
            </View>
            <TouchableHighlight underlayColor="transparent">
              <Text style={styles.countText}>Alarm clock</Text>
            </TouchableHighlight>
          </View>
        </View>
        {this.state.picker ? (
          this.state.blueberryTimePicker ? (
            <SettingPicker
              time={this.state.time}
              select={this.state.blueberryTimeSelect}
              updateTime={this.updateBlueberryTime}
              offSet={this.state.offSet}
              closeModal={() =>
                this.setState({
                  picker: false,
                  blueberryTimeSelect: this.state.defaultBlueberryTime,
                })
              }
              updateValue={() =>
                this.setState({
                  picker: false,
                  blueberryTimeSelect: this.state.blueberryTimeSelect,
                })
              }
            />
          ) : (
            <SettingPicker
              time={this.state.time}
              select={this.state.breakTimeSelect}
              updateTime={this.updateBreakTime}
              offSet={this.state.offSet}
              closeModal={() =>
                this.setState({
                  picker: false,
                  breakTimeSelect: this.state.defaultBreakTime,
                })
              }
              updateValue={() =>
                this.setState({
                  picker: false,
                  breakTimeSelect: this.state.breakTimeSelect,
                })
              }
            />
          )
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
export default Settings
