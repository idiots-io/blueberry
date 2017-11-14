import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { fontColor, subColor } from '../config'

const SettingListItem = ({ title, value }) => (
  <View style={styles.listItemWrapper}>
    <View style={styles.listItem}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <Text style={styles.countText}>{value}</Text>
    </View>
  </View>
)

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

export default SettingListItem
