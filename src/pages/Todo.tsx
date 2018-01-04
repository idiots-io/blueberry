import React from 'react'
import { View, ListView, Image } from 'react-native'
import { connect } from 'react-redux'
import DropdownAlert from 'react-native-dropdownalert'
import { Action, Todo } from '../reducers'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import Filter from '../components/Filter'
import TodoList from '../components/TodoList'
import CompletedList from '../components/CompletedList'
import AddTodoModal from '../components/AddTodoModal'
import _ from 'lodash'


namespace TodoComponent {
  export interface Props {
    todos: Todo[]
    completedTodos: Todo[]
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
  dropdown: any;

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    })

    this.state = {
      ds,
      dataSource: ds.cloneWithRowsAndSections(
        _.groupBy(_.filter(this.props.todos, (todo) => !todo.isDone), 'createdAt'),
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.todos.length !== this.props.todos.length) {
      console.log('is changed')
      this.setState({
        dataSource: this.state.ds.cloneWithRowsAndSections(
          _.groupBy(_.filter(this.props.todos, (todo) => !todo.isDone), 'createdAt'),
        ),
      })
    }
    if (prevProps.completedTodos.length !== this.props.completedTodos.length) {
      console.log('is changed to done')
      this.setState({
        dataSource: this.state.ds.cloneWithRowsAndSections(
          _.groupBy(_.filter(this.props.todos, (todo) => !todo.isDone), 'createdAt'),
        ),
      })
    }
    if (prevState.isTodoList !== this.state.isTodoList) {
      if (!this.state.isTodoList) {
        this.setState({
          dataSource: this.state.ds.cloneWithRowsAndSections(
            _.groupBy(_.filter(this.props.todos, (todo) => todo.isDone), 'createdAt'),
          ),
        })
      } else {
        this.setState({
          dataSource: this.state.ds.cloneWithRowsAndSections(
            _.groupBy(_.filter(this.props.todos, (todo) => !todo.isDone), 'createdAt'),
          ),
        })
      }
    }
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

  render() {
    return (
      <PageLayout statusBarBackgroundColor={'rgb(217, 217, 217)'}>
        <AddTodoModal
          visible={this.state.isAddMode}
          close={() => this.setState({ isAddMode: false })}
        />
        <Header />
        <Filter
          changeTodoList={() => this.setState({ isTodoList: true })}
          changeCompletedList={() => this.setState({ isTodoList: false })}
          isTodoList={this.state.isTodoList}
        />
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          containerStyle={{
            backgroundColor: "#2B73B6",
          }}
          startDelta={-100}
          // showCancel={true}
          onClose={(data) => this.onClose(data)}
          onCancel={(data) => this.onClose(data)}
        />
        {this.state.isTodoList ? (
          <View>
            <TodoList
              dataSource={this.state.dataSource}
              dropdownalert={(items) => this.showAlert(items)}
              onPress={() => this.setState({ isAddMode: true })}
            />
          </View>
        ) : (
            <CompletedList
              dataSource={this.state.dataSource}
            />
          )}

      </PageLayout>
    )
  }
}


export default connect(
  state => ({
    todos: state.app.todos,
    completedTodos: state.app.todos.filter(todo => todo.isDone)
  }),
  undefined,
)(TodoComponent)


