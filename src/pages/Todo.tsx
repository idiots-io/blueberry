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
import TodoListSectionHeader from '../components/TodoListSectionHeader'
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
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
    this.state = {
      ds,
      // dataSource: ds.cloneWithRowsAndSections([...props.todos])
      dataSource: ds.cloneWithRowsAndSections({
        '2017/10/08': [
          {
            text: 'Study React',
            sessionCount: 38
          },
          {
            text: 'Study Typescript',
            sessionCount: 12
          }
        ],
        '2017/11/04': [
          {
            text: 'Work on Resume',
            sessionCount: 3
          },
          {
            text: 'Git commit',
            sessionCount: 42
          }
        ],
        '2017/11/02': [
          {
            text: 'Work on Resume',
            sessionCount: 3
          },
          {
            text: 'Git commit',
            sessionCount: 42
          },
          {
            text: 'Work on Resume',
            sessionCount: 3
          },
          {
            text: 'Git commit',
            sessionCount: 42
          }
        ],
        '2017/11/01': [
          {
            text: 'Work on Resume',
            sessionCount: 3
          },
          {
            text: 'Git commit',
            sessionCount: 42
          }
        ]
      })
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
          renderRow={todo => (
            <TodoListItem text={todo.text} sessionCount={todo.sessionCount} />
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
