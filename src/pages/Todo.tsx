import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addTodo } from '../actions/todos'
import { Action, Todo } from '../reducers'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import FilterAndSearch from '../components/FilterAndSearch'

namespace TodoComponent {
  export interface Props {
    todos: Todo[]
    addTodo: (input: string) => Action
  }
}
class TodoComponent extends React.Component<TodoComponent.Props> {
  render() {
    return (
      <PageLayout statusBarBackgroundColor={'rgb(217, 217, 217)'}>
        <Header />
        <FilterAndSearch />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.addTodo('dummy todo')}>
          <Text>Add TODO</Text>
        </TouchableOpacity>
        <View>
          {this.props.todos.map(todo => (
            <View>
              <Text>{todo}</Text>
            </View>
          ))}
        </View>
      </PageLayout>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: 20,
    backgroundColor: 'pink'
  },
  button: {
    width: '25%',
    height: 24,
    backgroundColor: 'blue'
  }
})

export default connect(
  state => ({
    todos: state.app.todos
  }),
  {
    addTodo
  }
)(TodoComponent)
