import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  AlertIOS,
} from 'react-native'
import TodoListItem from '../components/TodoListItem'
import TodoListSectionHeader from '../components/TodoListSectionHeader'
import AddBlueberryBtn from '../components/AddBlueberryBtn'
import { SwipeListView } from 'react-native-swipe-list-view'
import { connect } from 'react-redux'
import { removeTodo, completedTodo } from '../actions/todos'
import { Action, Todo, Session } from '../reducers'
import { fontFamily, mainColor } from '../config'
import _ from 'lodash'

namespace TodoListComponent {
  export interface Props {
    todos: Todo[]
    sessions: Session[]
    addTodo: (input: string) => Action
    removeTodo: (id: number) => Action
    completedTodo: (id: number) => Action
    dataSource: any
    onPress: Function
    onRowClose: Function
    isTodoList: boolean
    dropdownalert: Function
    navigation: Object
  }
}

class TodoList extends Component<TodoListComponent.Props, {}> {
  constructor(props) {
    super(props)
  }

  deleteAlert = (id, secId, rowId, rowMap) => {
    AlertIOS.alert('정말 삭제 하시나요?', '삭제 후에는 복구가 불가능합니다.', [
      {
        text: '아니요',
        onPress: () => rowMap[`${secId}${rowId}`].closeRow(),
        style: 'cancel',
      },
      {
        text: '삭제하기',
        onPress: () => this.deleteRow(id, secId, rowId, rowMap),
      },
    ])
  }

  deleteRow = (id, secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].closeRow()
    setTimeout(() => this.props.removeTodo(id), 200)
  }

  completedTodo = (id, secId, rowId, rowMap, item) => {
    rowMap[`${secId}${rowId}`].closeRow()
    setTimeout(() => this.props.completedTodo(id), 200)
    this.props.dropdownalert(...item)
  }

  render() {
    const items = [
      {
        type: 'custom',
        title: '',
        message: '완료한 작업탭으로 이동했어요 :)  👇',
      },
    ]
    // { type: 'delete', title: '', message: '할 일이 삭제되었어요! 🙆' }
    const todos = _.filter(this.props.todos, ['isDone', false])
    return todos.length === 0 ? (
      <View style={styles.emptyBox}>
        <View>
          <Text style={styles.emptyText}>블루베리로</Text>
          <Text style={styles.emptyText}>할 일을</Text>
          <Text style={styles.emptyText}>시작해볼까요?</Text>
        </View>
      </View>
    ) : (
      <View>
        <AddBlueberryBtn onPress={() => this.props.onPress()} />
        <View style={{ height: Dimensions.get('window').height - 255 }}>
          <SwipeListView
            dataSource={this.props.dataSource}
            renderRow={todo => (
              <TodoListItem
                id={todo.id}
                title={todo.title}
                sessionCount={todo.sessionCount}
                overline="none"
                isTodoList={this.props.isTodoList}
                navigation={this.props.navigation}
              />
            )}
            disableRightSwipe
            renderSectionHeader={(_, category) => (
              <TodoListSectionHeader date={category} />
            )}
            renderHiddenRow={(data, secId, rowId, rowMap) => (
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
                    onPress={() =>
                      this.deleteAlert(data.id, secId, rowId, rowMap)
                    }
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
                    onPress={() =>
                      this.completedTodo(data.id, secId, rowId, rowMap, items)
                    }
                  >
                    <Image source={require('../assets/Todo/checkTask.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            rightOpenValue={-150}
          />
        </View>
      </View>
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

const mapDispatchToProps = (dispatch: any): any => {
  return {
    removeTodo: id => dispatch(removeTodo(id)),
    completedTodo: id => dispatch(completedTodo(id)),
  }
}

export default connect(
  state => ({
    todos: state.app.todos,
  }),
  mapDispatchToProps,
)(TodoList)
