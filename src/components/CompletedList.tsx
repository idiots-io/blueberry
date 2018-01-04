import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'
import TodoListItem from '../components/TodoListItem'
import TodoListSectionHeader from '../components/TodoListSectionHeader'
import { SwipeListView } from 'react-native-swipe-list-view'
import { mainColor } from '../config'
import { connect } from 'react-redux'
import { Todo } from '../reducers'
import { fontFamily } from '../config'


namespace CompletedListComponent {
  export interface Props {
    todos: Todo[]
    dataSource: any
    isTodoList: boolean
    navigation: Object
  }
}

class CompletedList extends Component<CompletedListComponent.Props, {}> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      this.props.dataSource.length === 0 ? (
        <View style={styles.emptyBox}>
          <View>
            <Image source={require('../assets/Todo/arrow-Up.png')} />
            <Text style={styles.emptyText}>(๑•̀_•́)و</Text>
          </View>
          <View>
            <Text style={styles.emptyText}>하나씩,</Text>
            <Text style={styles.emptyText}>하나씩,</Text>
            <Text style={styles.emptyText}>해냅시다.</Text>
          </View>
        </View>
      ) : (
          <SwipeListView
            style={{ marginTop: 16 }}
            dataSource={this.props.dataSource}
            renderRow={todo => (
              <TodoListItem
                id={todo.id}
                overline='line-through'
                title={todo.title}
                sessionCount={todo.sessionCount}
                isTodoList={this.props.isTodoList}
                navigation={this.props.navigation}
              />
            )}
            disableRightSwipe
            renderSectionHeader={(_, category) => (
              <TodoListSectionHeader date={category} />
            )}
          />
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

export default connect(
  state => ({
    todos: state.app.todos,
  }),
  undefined,
)(CompletedList)