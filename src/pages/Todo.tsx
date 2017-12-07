import React from 'react'
import {
  Text,
  View,
  ListView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { Action, Todo } from '../reducers'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import FilterAndSearch from '../components/FilterAndSearch'
import AddBlueberryBtn from '../components/AddBlueberryBtn'
import TodoListItem from '../components/TodoListItem'
import TodoListSectionHeader from '../components/TodoListSectionHeader'
import { SwipeListView } from 'react-native-swipe-list-view'
import AddTodoModal from '../components/AddTodoModal'
import _ from 'lodash'
import { mainColor } from '../config'

namespace TodoComponent {
  export interface Props {
    todos: Todo[]
    addTodo: (input: string) => Action
  }
  export interface State {
    ds: any
    dataSource: any
    isAddMode: boolean
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
        <FilterAndSearch />
        <AddBlueberryBtn onPress={() => this.setState({ isAddMode: true })} />
        {this.props.todos.length === 0 ? (
          <View style={styles.emptyBox}>
            <View>
              <Text style={styles.emptyText}>블루베리로</Text>
              <Text style={styles.emptyText}>할 일을</Text>
              <Text style={styles.emptyText}>시작해볼까요?</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.setState({ isAddMode: true })}
              >
                <Image source={require('../assets/Todo/blueberry_empty.png')} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <SwipeListView
            dataSource={this.state.dataSource}
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
