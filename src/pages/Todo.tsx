import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addTodo } from '../actions/todos'

class Todo extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.statusBar} />
        <Text>Todo Page!!!!!</Text>
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
      </View>
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
)(Todo)
