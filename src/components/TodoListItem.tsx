import React from 'react'
import { StyleSheet, View, Text, ImageBackground } from 'react-native'
import { fontColor, mainColor, fontFamily, subColor } from '../config'

const TodoListItem = ({ overline, title, sessionCount, isTodoList }) => (
  <View style={styles.listItemWrapper}>
    <View style={styles.listItem}>
      <View style={styles.textWrapper}>
        <Text style={[styles.text, { textDecorationLine: overline }]}>{title}</Text>
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
          isTodoList ? (
            <ImageBackground
              source={require('../assets/Todo/blueberry_ing.png')}
              style={styles.countWrapper}
            >
              <Text style={styles.countText}>{sessionCount}</Text>
            </ImageBackground>

          ) : (
              <ImageBackground
                source={require('../assets/Todo/blueberry_normal.png')}
                style={styles.countWrapper}
              >
                <Text style={styles.countText}>{sessionCount}</Text>
              </ImageBackground>

            )
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
