import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import TodoListItem from '../components/TodoListItem'
import TodoListSectionHeader from '../components/TodoListSectionHeader'
import { SwipeListView } from 'react-native-swipe-list-view'
import { mainColor } from '../config'
import { connect } from 'react-redux'
import { Action, Todo, Session } from '../reducers'
import { fontFamily } from '../config'
import filter from 'lodash/filter'

namespace TodoListComponent {
  export interface Props {
    todos: Todo[]
    sessions: Session[]
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
    return this.props.todos.length === 0 ? (
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
            sessionCount={
              filter(this.props.sessions, session => session.todoId === todo.id)
                .length
            }
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
              height: 50,
            }}
          >
            <View
              style={{
                backgroundColor: mainColor.light,
                flex: 0.2,
                height: 75,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.props.onPress}
              >
                <Image source={require('../assets/Todo/trash.png')} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: mainColor.default,
                flex: 0.2,
                height: 75,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.props.onPress}
              >
                <Image source={require('../assets/Todo/checkTask.png')} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        rightOpenValue={-150}
      />
    )
  }
}

const styles = StyleSheet.create({
  emptyText: {
    fontFamily: fontFamily.thin,
    fontSize: 40,
    color: mainColor.light,
    marginBottom: 10,
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
    sessions: state.app.sessions,
  }),
  undefined,
)(TodoList)
