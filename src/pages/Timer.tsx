import React from 'react'
import { Text, View, Image } from 'react-native'

export default class Timer extends React.Component {
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
            source={require('../assets/Timer/timer_active.png')}
            style={{ height: 28, width: 28, marginTop: 8 }}
          />
        ) : (
          <Image
            source={require('../assets/Global/timer_default.png')}
            style={{ height: 22, width: 22, marginTop: 5 }}
          />
        )}
      </View>
    ),
  }
  render() {
    return (
      <View>
        <Text>Timer Page!!</Text>
      </View>
    )
  }
}
