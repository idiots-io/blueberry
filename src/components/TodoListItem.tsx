import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { fontColor, mainColor, fontFamily, subColor } from '../config'
import * as Animatable from 'react-native-animatable';


namespace TodoListItem {
  export interface Props {
    overline: "none" | "underline" | "line-through" | "underline line-through"
    title: string
    sessionCount: number
    isTodoList: boolean
    navigation: any
    id: string
  }
  export interface State {
    isStartChecking: boolean
  }
}

class TodoListItem extends React.Component<TodoListItem.Props, TodoListItem.State> {
  constructor(props) {
    super(props)
    this.state = {
      isStartChecking: false
    }
  }

  goToWorkTab = (workId) => {
    this.props.navigation.navigate('Work', { name: 'Work', workId })
    this.setState({
      isStartChecking: false
    })
  }

  render() {
    const {
      overline,
      title,
      sessionCount,
      isTodoList,
      id
    } = this.props

    const { isStartChecking } = this.state


    return (
      <View style={styles.listItemWrapper}>
        <View style={styles.listItem}>
          <View style={styles.textWrapper}>
            <Text style={[styles.text, { textDecorationLine: overline }]}>{title}</Text>
          </View>
          {sessionCount === 0 ? (
            isStartChecking ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.goToWorkTab(id)}
              >
                <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite"
                  source={require('../assets/Todo/activeBtn.png')}
                  style={styles.countActiveWrapper}
                >
                </Animatable.Image>
              </TouchableOpacity>
            ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.setState({ isStartChecking: true })}
                >
                  < ImageBackground
                    source={require('../assets/Todo/blueberry_notyet.png')}
                    style={styles.countWrapper}
                  >
                    <Text style={[styles.countText, { color: subColor.dark }]}>
                      {sessionCount}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              )
          ) : (
              isTodoList ? (
                isStartChecking ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.setState({ isStartChecking: true })}
                  >
                    < ImageBackground
                      source={require('../assets/Todo/activeBtn.png')}
                      style={styles.countWrapper}
                    >
                    </ImageBackground>
                  </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.setState({ isStartChecking: true })}
                    >
                      <ImageBackground
                        source={require('../assets/Todo/blueberry_ing.png')}
                        style={styles.countWrapper}
                      >
                        <Text style={styles.countText}>{sessionCount}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  )
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
      </View >
    )
  }
}

const styles = StyleSheet.create({
  listItemWrapper: {
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  countWrapper: {
    height: 50,
    width: 50,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countActiveWrapper: {
    height: 63,
    width: 70,
    marginVertical: 0,
    marginTop: 15,
    marginBottom: 2,
    marginRight: -10,
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
