import React from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
import { fontColor, mainColor, fontFamily } from '../config'

const TodoListItem = ({ text, sessionCount = 0 }) => (
  <View style={styles.listItemWrapper}>
    <View style={styles.listItem}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <ImageBackground
        source={require('../assets/Todo/blueberry_ing.png')}
        style={styles.countWrapper}>
        <Text style={styles.countText}>{sessionCount}</Text>
      </ImageBackground>
    </View>
  </View>
)

const styles = StyleSheet.create({
  listItemWrapper: {
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  countWrapper: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  countText: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
    backgroundColor: 'transparent',
    color: 'white',
  },
  listItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 0.25,
    borderColor: mainColor.light,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: fontColor.dark
  }
})

export default TodoListItem
