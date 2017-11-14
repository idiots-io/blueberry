import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
// import Hr from './Hr'

const SettingSectionHeader = section => (
  <View style={styles.listItemWrapper}>
    {/* {console.log(section)} */}
    {section == 'intervalSection' ? (
      <Image source={require('../assets/Settings/sectionFirst.png')} />
    ) : (
      <Image source={require('../assets/Settings/sectionSecond.png')} />
    )}
  </View>
)

const styles = StyleSheet.create({
  listItemWrapper: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    paddingTop: 20,
  },
})
export default SettingSectionHeader
