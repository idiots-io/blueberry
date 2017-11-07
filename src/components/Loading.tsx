import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'blue',
    flex: 1
  }
})

export default () => {
  console.log('LOADING')
  return (
    <View style={styles.wrapper}>
      <Text>LOADING!!!</Text>
    </View>
  )
}
