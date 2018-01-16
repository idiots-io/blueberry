import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import TodoListItem from '../components/TodoListItem'
import TodoListSectionHeader from '../components/TodoListSectionHeader'
import { SwipeListView } from 'react-native-swipe-list-view'
import { mainColor } from '../config'
import { connect } from 'react-redux'
import { Todo, Action } from '../reducers'
import { undoIsDone } from '../actions/todos'
import { fontFamily } from '../config'

namespace CompletedListComponent {
  export interface Props {
    todos: Todo[]
    dataSource: any
    isTodoList: boolean
    navigation: Object
    undoIsDone: (id: number) => Action
  }
}

class CompletedList extends Component<CompletedListComponent.Props, {}> {
  constructor(props) {
    super(props)
  }

  _undoIsDone = (id, secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].closeRow()
    this.props.undoIsDone(id)
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
                    onPress={() => this._undoIsDone(data.id, secId, rowId, rowMap)}
                  >
                    <Image
                      source={require('../assets/Todo/back.png')}
                    />
                  </TouchableOpacity>
                </View>
              </ View>
            )}
            rightOpenValue={-75}
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

const mapDispatchToProps = (dispatch: any): any => {
  return {
    undoIsDone: id => dispatch(undoIsDone(id)),
  }
}

export default connect(
  state => ({
    todos: state.app.todos,
  }),
  mapDispatchToProps,
)(CompletedList)