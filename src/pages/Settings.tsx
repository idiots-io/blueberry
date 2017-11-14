import React from 'react'
import { View, ListView, Image, Switch } from 'react-native'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import SettingListItem from '../components/SettingListItem'
import SettingSectionHeader from '../components/SettingSectionHeader'
import { mainColor } from '../config'

namespace Settings {
  export interface Props {}
  export interface State {
    ds: any
    dataSource: any
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
      // dataSource: ds.cloneWithRowsAndSections([...props.todos])
      dataSource: ds.cloneWithRowsAndSections({
        intervalSection: [
          {
            title: 'Interval Duration',
            value: '25분',
          },
          {
            title: 'Short Break',
            value: '5분',
          },
          {
            title: 'Long Break',
            value: '15분',
          },
          {
            title: 'Long Break After',
            value: '4분',
          },
          {
            title: 'Target',
            value: '10 intervals per day',
          },
        ],
        soundSection: [
          {
            title: 'Chronometer Sound',
            value: (
              <Switch
                onTintColor={mainColor.default}
                value={true}
                style={{ height: 20 }}
              />
            ),
          },
          {
            title: 'Interval Completed Sound',
            value: 'Alert >',
          },
          {
            title: 'End Break Sound',
            value: 'Horn >',
          },
          {
            title: 'Never Sleep',
            value: (
              <Switch
                onTintColor={mainColor.default}
                value={true}
                style={{ height: 20 }}
              />
            ),
          },
        ],
      }),
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
      </PageLayout>
    )
  }
}

export default Settings
