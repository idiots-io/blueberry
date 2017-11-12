import React from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
import { fontColor, mainColor } from '../config'

const TodoListItem = ({ text, sessionCount = 0 }) => (
  <View style={styles.listItemWrapper}>
    <View style={styles.listItem}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <ImageBackground
        source={require('../../src/assets/Todo/blueberry_ing.png')}
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
    fontSize: 20,
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold'
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
    fontSize: 16,
    color: fontColor.dark
  }
})

export default TodoListItem
