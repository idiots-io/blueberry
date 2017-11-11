import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { fontColor } from '../config'

const Header = ({ todaysCount = 100 }) => (
  <View style={styles.headerWrapper}>
    <Image source={require('../../src/assets/Global/logo_upper.png')} />
    <Text style={styles.headerText}>
      오늘{' '}
      <Text style={{ color: fontColor.blue }}>
        뽀모도로 <Text style={{ fontWeight: 'bold' }}>{todaysCount}</Text>
      </Text>
    </Text>
  </View>
)

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: 'rgb(245, 245, 245)',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    color: fontColor.sub
  }
})

export default Header
