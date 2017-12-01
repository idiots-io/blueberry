import React from 'react'
import { Text, View, Image } from 'react-native'

export default class Settings extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}>
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
  render() {
    return (
      <View>
        <Text>Settings Page!!</Text>
      </View>
    )
  }
}
