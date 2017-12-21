import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import TodoListItem from '../components/TodoListItem'
import TodoListSectionHeader from '../components/TodoListSectionHeader'
import { SwipeListView } from 'react-native-swipe-list-view'
import { mainColor } from '../config'
import { connect } from 'react-redux'
import { Action, Todo } from '../reducers'


namespace TodoListComponent {
  export interface Props {
    todos: Todo[]
    addTodo: (input: string) => Action
    dataSource: any
    onPress: Function
  }
}

class TodoList extends Component<TodoListComponent.Props, {}> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      this.props.todos.length === 0 ? (
        <View style={styles.emptyBox}>
          <View>
            <Text style={styles.emptyText}>블루베리로</Text>
            <Text style={styles.emptyText}>할 일을</Text>
            <Text style={styles.emptyText}>시작해볼까요?</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.onPress}
            >
              <Image source={require('../assets/Todo/blueberry_empty.png')} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
          <SwipeListView
            dataSource={this.props.dataSource}
            renderRow={todo => (
              <TodoListItem
                title={todo.title}
                sessionCount={todo.sessionCount}
              />
            )}
            disableRightSwipe
            renderSectionHeader={(_, category) => (
              <TodoListSectionHeader date={category} />
            )}
            renderHiddenRow={() => (
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingLeft: 15,
                  height: 50,
                }}
              >
                <View style={{ backgroundColor: 'red', flex: 1, height: 50 }}>
                  <Text>Delete</Text>
                </View>
                <View style={{ backgroundColor: 'blue' }}>
                  <Text>Start</Text>
                </View>
              </View>
            )}
            rightOpenValue={-75}
          />
        )


    )
  }
}

const styles = StyleSheet.create({
  emptyText: {
    // fontFamily: fontFamily.thin,
    fontSize: 40,
    color: mainColor.light,
  },
  emptyBox: {
    justifyContent: 'space-between',
    alignContent: 'space-between',
    paddingHorizontal: 42,
    paddingVertical: 70,
    height: Dimensions.get('window').height - 240,
  },
})

export default connect(
  state => ({
    todos: state.app.todos,
  }),
  undefined,
)(TodoList)