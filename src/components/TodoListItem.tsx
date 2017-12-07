import React from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
<<<<<<< HEAD
import { fontColor, mainColor, subColor } from '../config'
=======
import { fontColor, mainColor, fontFamily } from '../config'
>>>>>>> 3b094875a25df2d9febbc755ca23ba1e333fe336

const TodoListItem = ({ title, sessionCount }) => (
  <View style={styles.listItemWrapper}>
    <View style={styles.listItem}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{title}</Text>
      </View>
      {sessionCount === 0 ? (
        <ImageBackground
          source={require('../assets/Todo/blueberry_notyet.png')}
          style={styles.countWrapper}
        >
          <Text style={[styles.countText, { color: subColor.dark }]}>
            {sessionCount}
          </Text>
        </ImageBackground>
      ) : (
        <ImageBackground
          source={require('../assets/Todo/blueberry_ing.png')}
          style={styles.countWrapper}
        >
          <Text style={styles.countText}>{sessionCount}</Text>
        </ImageBackground>
      )}
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
    fontFamily: fontFamily.regular,
    fontSize: 18,
    backgroundColor: 'transparent',
    color: 'white',
<<<<<<< HEAD
    fontWeight: 'bold',
=======
>>>>>>> 3b094875a25df2d9febbc755ca23ba1e333fe336
  },
  listItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 0.25,
    borderColor: mainColor.light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: fontColor.dark,
  },
})

export default TodoListItem
