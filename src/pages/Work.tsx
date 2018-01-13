import React from 'react'
import {
  StyleSheet,
  Image,
  Text,
  Dimensions,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native'
import { connect } from 'react-redux'
const Carousel = require('react-native-snap-carousel').default
// import Carousel from 'react-native-snap-carousel';
import { filter, findIndex } from 'lodash'

import { State, Todo } from '../reducers'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import StartWorkBtn from '../components/StartWorkBtn'

export interface Work {
  todo: Todo
  sessionsCount: number
}

namespace WorkPage {
  export interface Props {
    navigation: any
    timers: Work[]
  }
  export interface State {
    selectedTimerIndex: number
  }
}

class WorkPage extends React.Component<WorkPage.Props, WorkPage.State> {
  s: any;
  static navigationOptions = {
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
            source={require('../assets/Global/timer_active.png')}
            style={{ height: 28, width: 28, marginTop: 8 }}
          />
        ) : (
            <Image
              source={require('../assets/Global/timer_default.png')}
              style={{ height: 22, width: 22, marginTop: 5 }}
            />
          )}
      </View>
    ),
  }
  constructor(props) {
    super(props)
    this.state = {
      selectedTimerIndex: 0,
    }
  }

  componentDidUpdate(prevProps, { }) {
    if (prevProps.navigation.state.params !== this.props.navigation.state.params) {
      const todoIndex = this.props.navigation.state.params !== undefined ? findIndex(this.props.timers, e => e.todo.id === this.props.navigation.state.params.workId) : 0
      this.setState({
        selectedTimerIndex: todoIndex
      })
    }
  }

  _renderTimers = ({ item, index }: { item: Work; index: number }) => {
    return (
      <View style={styles.timer}>
        <Text>
          {this.state.selectedTimerIndex === index ? '' : item.todo.title}
        </Text>
        <Image
          style={styles.timerImage}
          source={require('../assets/Timer/blueberry_regular.png')}
        >
          <Text style={styles.timerSessionCounter}>{item.sessionsCount}</Text>
        </Image>
      </View>
    )
  }

  _renderTimerSelector = () => (
    <View style={styles.pageWrapper}>
      <View style={styles.createdDateText}>
      </View>
      <Text style={styles.titleText}>
        {this.props.timers[this.state.selectedTimerIndex].todo.title}
      </Text>
      <Carousel
        style={styles.carousel}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.5}
        data={this.props.timers}
        renderItem={this._renderTimers}
        onSnapToItem={(index: number) => {
          this.setState({ selectedTimerIndex: index })
        }}
        firstItem={this.state.selectedTimerIndex}
      />
      <StartWorkBtn
        onPress={() => this.props.navigation.navigate('WorkModal', { timerIndex: this.state.selectedTimerIndex })}
      />
    </View>
  )

  _renderNoTimersMessage = () => (
    <View style={styles.pageWrapper}>
      <Text>
        ( •̀_•́;)

        앗.
        할일부터
        등록할까요?
      </Text>
    </View>
  )

  render() {
    return (
      <PageLayout statusBarBackgroundColor={'rgb(217, 217, 217)'}>
        <Header />
        {this.props.timers.length ? this._renderTimerSelector() : this._renderNoTimersMessage()}
      </PageLayout>
    )
  }
}

interface StyleTypes {
  pageWrapper: ViewStyle
  createdDateText: ViewStyle
  titleText: TextStyle
  carousel: ViewStyle
  timer: ViewStyle
  timerImage: ImageStyle
  timerSessionCounter: TextStyle
  countWrapper: ImageStyle
}
const styles = StyleSheet.create<StyleTypes>({
  pageWrapper: {
    alignItems: 'center',
  },
  createdDateText: {
    marginTop: Dimensions.get('window').height / 10,
    flexDirection: 'row',
    marginBottom: 15,
  },
  titleText: {
    marginBottom: Dimensions.get('window').height / 20,
    fontSize: 35,
    color: '#377fd8',
  },
  carousel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    marginBottom: Dimensions.get('window').height / 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerImage: {
    height: Dimensions.get('window').width * 0.5,
    width: Dimensions.get('window').width * 0.5,
    resizeMode: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerSessionCounter: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 50,
    opacity: 0.7,
    zIndex: 1,
  },
  countWrapper: {
    height: 50,
    width: 50,
    marginVertical: 15,
  }
})

export default connect((state: { app: State }) => {
  return {
    timers: state.app.todos.reduce((result, todo) => {
      const sessionsCount = filter(
        state.app.sessions,
        session => session.todoId === todo.id,
      ).length
      result.push({ todo, sessionsCount })
      return result
    }, []),
  }
}, {})(WorkPage)
