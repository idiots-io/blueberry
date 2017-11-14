import React from 'react'
import { StyleSheet, ImageBackground, Text, Dimensions } from 'react-native';
const Carousel = require('react-native-snap-carousel').default;
// import Carousel from 'react-native-snap-carousel';

import { Todo } from '../reducers';

import PageLayout from '../components/PageLayout';
import Header from '../components/Header';
// import StartTimerBtn from '../components/StartTimerBtn';

namespace Timer {
  export interface Props {
    todos: Todo[]
  }
  export interface State {
    timers: { text: string, sessionCount: number }[]
  }
}
export default class Timer extends React.Component<Timer.Props> {

  _renderTimers() {
    return (
      <ImageBackground
        style={styles.CarouselItemWrapper}
        imageStyle={styles.image}
        source={require('../assets/Timer/blueberry_dark.png')}>
        <Text style={styles.text}>{100}</Text>
      </ImageBackground>
    )
  }

  render() {
    return (
      <PageLayout statusBarBackgroundColor={'rgb(217, 217, 217)'}>
        <Header />
          <Text>생성일   오늘 2017/10/10</Text>
          <Carousel
            style={styles.wrapper}
            sliderWidth={Dimensions.get('window').width}
            sliderHeight={Dimensions.get('window').width}
            itemWidth={150}
            data={[{sessionCount: 10}, {sessionCount: 20}]}
            renderItem={this._renderTimers}
          />
          {/* <StartTimerBtn
            onPress={() => { console.log('hi') }}
          /> */}
      </PageLayout>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain'
  },
  CarouselItemWrapper: {
    height: 150,
    width: 150,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    backgroundColor: 'transparent',
    // color: 'white',
    fontSize: 20,
  }
})
