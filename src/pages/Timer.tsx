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
} from 'react-native';
import { connect } from 'react-redux';
const Carousel = require('react-native-snap-carousel').default;
// import Carousel from 'react-native-snap-carousel';
import { filter } from 'lodash';

import { State, Todo } from '../reducers';

import PageLayout from '../components/PageLayout';
import Header from '../components/Header';
import StartTimerBtn from '../components/StartTimerBtn';

interface Timer {
  todo: Todo;
  sessionsCount: number;
};

namespace TimersPage {
  export interface Props {
    timers: Timer[];
  }
  export interface State {
    selectedTimerIndex: number;
  }
}
class TimersPage extends React.Component<TimersPage.Props, TimersPage.State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTimerIndex: 0,
    };
  }

  _renderTimers = ({ item, index }: { item: Timer, index: number }) => {
    return (
      <View style={styles.timer}>
        <Text>{this.state.selectedTimerIndex === index ? '' : item.todo.title}</Text>
        <Image
          style={styles.timerImage}
          source={require('../assets/Timer/blueberry_dark.png')}>
          <Text style={styles.timerSessionCounter}>{item.sessionsCount}</Text>
        </Image>
      </View>
    )
  }

  render() {
    return (
      <PageLayout statusBarBackgroundColor={'rgb(217, 217, 217)'}>
        <Header />
          <View
            style={styles.pageWrapper}
          >
            <View style={styles.createdDateText}>
              <Text style={{ color: '#162e80', fontSize: 15 }}>생성일{'   '}</Text>
              <Text style={{ color: '#a8b7c7', fontSize: 15 }}>
                {this.props.timers[this.state.selectedTimerIndex].todo.createdAt.toDateString()}
              </Text>
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
                this.setState({ selectedTimerIndex: index });
              }}
            />
            <StartTimerBtn
              onPress={() => { console.log('hi') }}
            />
          </View>
      </PageLayout>
    )
  }
}

interface StyleTypes {
  pageWrapper: ViewStyle;
  createdDateText: ViewStyle;
  titleText: TextStyle;
  carousel: ViewStyle;
  timer: ViewStyle,
  timerImage: ImageStyle,
  timerSessionCounter: TextStyle;
};
const styles = StyleSheet.create<StyleTypes>({
  pageWrapper: {
    alignItems: 'center',
  },
  createdDateText: {
    marginTop: Dimensions.get('window').height/10,
    flexDirection: 'row',
    marginBottom: 15,
  },
  titleText: {
    marginBottom: Dimensions.get('window').height/20,
    fontSize: 35,
    color: '#377fd8'
  },
  carousel: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  timer: {
    marginBottom: Dimensions.get('window').height/20,
    justifyContent: 'center',
    alignItems: 'center'
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
  }
});

export default connect((state: { app: State }) => {
  return {
    timers: state.app.todos.reduce((result, todo) => {
      const sessionsCount = filter(state.app.sessions, session => (session.todoId === todo.id)).length;
      result.push({ todo, sessionsCount });
      return result;
    }, []),
  };
}, {})(TimersPage);