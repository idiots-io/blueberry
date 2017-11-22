import React from 'react'
import { View, ListView, Image, Switch } from 'react-native'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import SettingListItem from '../components/SettingListItem'
import SettingSectionHeader from '../components/SettingSectionHeader'
import SettingPicker from '../components/SettingPicker'
import { mainColor } from '../config'

namespace Settings {
  export interface Props {}
  export interface State {
    ds: any
    dataSource: any
    time: any
    select: any
  }
}

class Settings extends React.Component<Settings.Props, Settings.State> {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })
    this.state = {
      ds,
      dataSource: ds.cloneWithRowsAndSections({
        intervalSection: [
          {
            title: '블루베리 시간',
            value: '25분',
          },
          {
            title: '쉬는 시간',
            value: '5분',
          },
        ],
        soundSection: [
          {
            title: '블루베리 진행 소리 on/off',
            value: (
              <Switch
                onTintColor={mainColor.default}
                value={true}
                style={{ height: 20 }}
              />
            ),
          },
          {
            title: '블루베리 완료 소리',
            value: 'Alert clock',
          },
        ],
      }),
      time: [],
      select: '25분',
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

  render() {
    return (
      <PageLayout statusBarBackgroundColor={'rgb(217, 217, 217)'}>
        <Header />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={item => (
            <SettingListItem title={item.title} value={item.value} />
          )}
          renderSectionHeader={(_, category) => (
            <SettingSectionHeader section={category} />
          )}
        />
        <SettingPicker
          time={this.state.time}
          select={this.state.select}
          updateTime={this.updateTime}
        />
      </PageLayout>
    )
  }
}

export default Settings
