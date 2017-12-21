import React from 'react'
import { View, ListView, Image } from 'react-native'
import { connect } from 'react-redux'
import { Action, Todo } from '../reducers'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import Filter from '../components/Filter'
// import Search from '../components/Search'
import AddBlueberryBtn from '../components/AddBlueberryBtn'
import TodoList from '../components/TodoList'
import CompletedList from '../components/CompletedList'
import AddTodoModal from '../components/AddTodoModal'
import _ from 'lodash'

namespace TodoComponent {
  export interface Props {
    todos: Todo[]
    addTodo: (input: string) => Action
  }
  export interface State {
    ds: any
    dataSource: any
    isAddMode: boolean
    isTodoList: boolean
  }
}

class TodoComponent extends React.Component<
  TodoComponent.Props,
  TodoComponent.State
> {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })
    this.state = {
      ds,
      // dataSource: ds.cloneWithRowsAndSections([...props.todos])
      dataSource: ds.cloneWithRowsAndSections(
        _.groupBy(this.props.todos, 'createdAt'),
      ),
      isAddMode: false,
      isTodoList: true,
    }
  }

  static navigationOptions = {
    tabBarLabel: '할 일 목록',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ focused }) => (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        {focused ? (
          <Image
            source={require('../assets/Todo/todo_active.png')}
            style={{ height: 23, width: 23, marginTop: 7 }}
          />
        ) : (
          <Image
            source={require('../assets/Global/todo_default.png')}
            style={{ height: 17, width: 22, marginTop: 5 }}
          />
        )}
      </View>
    ),
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todos.length !== this.props.todos.length) {
      this.setState({
        dataSource: this.state.ds.cloneWithRowsAndSections(
          _.groupBy(this.props.todos, 'createdAt'),
        ),
      })
    }
  }

  render() {
    return (
      <PageLayout statusBarBackgroundColor={'rgb(217, 217, 217)'}>
        <AddTodoModal
          visible={this.state.isAddMode}
          close={() => this.setState({ isAddMode: false })}
        />
        <Header />
        {/* <Search /> */}
        <Filter
          changeTodoList={() => this.setState({ isTodoList: true })}
          changeCompletedList={() => this.setState({ isTodoList: false })}
          isTodoList={this.state.isTodoList}
        />

        {this.state.isTodoList ? (
          <View>
            <AddBlueberryBtn
              onPress={() => this.setState({ isAddMode: true })}
            />
            <TodoList
              dataSource={this.state.dataSource}
              onPress={() => this.setState({ isAddMode: true })}
            />
          </View>
        ) : (
          <CompletedList dataSource={this.state.dataSource} />
        )}
      </PageLayout>
    )
  }
}

export default connect(
  state => ({
    todos: state.app.todos,
  }),
  undefined,
)(TodoComponent)
