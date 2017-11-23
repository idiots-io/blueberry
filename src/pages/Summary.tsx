import React from 'react'
import { Text, View, Image } from 'react-native'

export default class Summary extends React.Component {
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
            source={require('../assets/Summary/summary_active.png')}
            style={{ height: 26, width: 28, marginTop: 6 }}
          />
        ) : (
          <Image
            source={require('../assets/Global/summary_default.png')}
            style={{ height: 18, width: 22, marginTop: 3 }}
          />
        )}
      </View>
    ),
  }

  render() {
    return (
      <View>
        <Text>Summary Page!!</Text>
      </View>
    )
  }
}
