import React from 'react'
import {
  View,
  ListView,
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
    ds: any
    time: any
    select: any
    picker: any
    offSet: any
    defaultTime: any
  }
}

class Settings extends React.Component<Settings.Props, Settings.State> {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })
    const deviceHeight = Dimensions.get('window').height
    const defaultTime = {
      blueberry: '25분',
    }
    this.state = {
      ds,
      time: [],
      select: defaultTime.blueberry,
      defaultTime: defaultTime.blueberry,
      picker: false,
      offSet: new Animated.Value(deviceHeight),
    }
    for (let i = 1; i < 13; i++) {
      this.setState({
        time: this.state.time.push(`${i * 5}분`),
      })
    }
  }

  static navigationOptions = {
    tabBarLabel: '환경설정',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
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

  updateTime = time => {
    this.setState({ select: time })
  }
  isPickerMode = () => this.setState({ picker: true })
  render() {
    return (
      <PageLayout statusBarBackgroundColor={'rgb(217, 217, 217)'}>
        <Header />
        <View style={styles.listItemWrapper}>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>블루베리 시간</Text>
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.isPickerMode}
            >
              <Text style={styles.countText}>{this.state.select}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>쉬는 시간</Text>
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.isPickerMode}
            >
              <Text style={styles.countText}>{this.state.time[0]}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>블루베리 진행 소리 on/off</Text>
            </View>
            <Switch
              onTintColor={mainColor.default}
              value={true}
              style={{ height: 20 }}
            />
          </View>
          <View style={styles.listItem}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>블루베리 완료 소리</Text>
            </View>
            <TouchableHighlight underlayColor="transparent">
              {/* // onPress={this.isPickerMode} */}
              <Text style={styles.countText}>Alarm clock</Text>
            </TouchableHighlight>
          </View>
        </View>
        {this.state.picker ? (
          <SettingPicker
            time={this.state.time}
            select={this.state.select}
            updateTime={this.updateTime}
            offSet={this.state.offSet}
            closeModal={() =>
              this.setState({ picker: false, select: this.state.defaultTime })}
            updateValue={() =>
              this.setState({ picker: false, select: this.state.select })}
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
export default Settings
