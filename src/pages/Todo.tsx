import React from 'react'
import { Text, View, ListView } from 'react-native'
import { connect } from 'react-redux'
import { addTodo } from '../actions/todos'
import { Action, Todo } from '../reducers'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import FilterAndSearch from '../components/FilterAndSearch'
import AddBlueberryBtn from '../components/AddBlueberryBtn'
import TodoListItem from '../components/TodoListItem'
import { SwipeListView } from 'react-native-swipe-list-view'

namespace TodoComponent {
  export interface Props {
    todos: Todo[]
    addTodo: (input: string) => Action
  }
  export interface State {
    ds: any
    dataSource: any
  }
}
class TodoComponent extends React.Component<
  TodoComponent.Props,
  TodoComponent.State
> {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([...props.todos])
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todos.length !== this.props.todos.length) {
      this.setState({
        dataSource: this.state.ds.cloneWithRows([...this.props.todos])
      })
    }
  }
  render() {
    return (
      <PageLayout statusBarBackgroundColor={'rgb(217, 217, 217)'}>
        <Header />
        <FilterAndSearch />
        <AddBlueberryBtn
          onPress={() => this.props.addTodo('Study Hard, Play Harder')}
        />
        <SwipeListView
          dataSource={this.state.dataSource}
          renderRow={todo => <TodoListItem text={todo} />}
          renderHiddenRow={() => (
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingLeft: 15,
                height: 50
              }}>
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
      </PageLayout>
    )
  }
}

export default connect(
  state => ({
    todos: state.app.todos
  }),
  {
    addTodo
  }
)(TodoComponent)
