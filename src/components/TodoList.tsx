import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import TodoListItem from '../components/TodoListItem'
import TodoListSectionHeader from '../components/TodoListSectionHeader'
import { SwipeListView } from 'react-native-swipe-list-view'
import { connect } from 'react-redux'
import { removeTodo, completedTodo } from '../actions/todos'
import { Action, Todo, } from '../reducers'
import { fontFamily, mainColor } from '../config'

namespace TodoListComponent {
  export interface Props {
    todos: Todo[]
    addTodo: (input: string) => Action
    removeTodo: (id: number) => Action
    completedTodo: (id: number) => Action
    dataSource: any
    onPress: Function
    onRowClose: Function
    isTodoList: boolean
  }
}

class TodoList extends Component<TodoListComponent.Props, {}> {
  constructor(props) {
    super(props)
  }


  showAlert(item) {
    if (item.type == 'close') {
      this.closeAlert()
    } else {
      const title = item.title
      this.dropdown.alertWithType(item.type, title, item.message)
    }
  }
  closeAlert = () => {
    this.dropdown.close()
  }
  onClose(data) {
    console.log(data);
  }

  deleteRow = (id, secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].closeRow()
    this.props.removeTodo(id)
  }

  completedTodo = (id, secId, rowId, rowMap, item) => {
    rowMap[`${secId}${rowId}`].closeRow()
    this.props.completedTodo(id)
    this.showAlert(item)
  }

  render() {
    const items = {
      type: 'custom', title: '완료한 작업으로 이동', message: '실행취소'
    }

    return (
      this.props.dataSource.length === 0 ? (
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
          <View>
            <SwipeListView
              dataSource={this.props.dataSource}
              renderRow={(todo) => (
                <TodoListItem
                  title={todo.title}
                  sessionCount={todo.sessionCount}
                  overline='none'
                  isTodoList={this.props.isTodoList}
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
                  <View style={{ backgroundColor: mainColor.light, flex: 0.2, height: 75, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.deleteRow(data.id, secId, rowId, rowMap)}
                    >
                      <Image
                        source={require('../assets/Todo/trash.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ backgroundColor: mainColor.default, flex: 0.2, height: 75, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.completedTodo(data.id, secId, rowId, rowMap, items)}
                    >
                      <Image source={require('../assets/Todo/checkTask.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              rightOpenValue={-150}
            />
            <DropdownAlert
              ref={(ref) => this.dropdown = ref}
              containerStyle={{
                backgroundColor: mainColor.default,
              }}
              // showCancel={true}
              onClose={(data) => this.onClose(data)}
              onCancel={(data) => this.onClose(data)}
            // imageSrc={'https://facebook.github.io/react/img/logo_og.png'}
            />
          </View>
        )


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
  }), mapDispatchToProps
)(TodoList)