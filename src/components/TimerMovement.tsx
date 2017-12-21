import React from 'react';
import {
  ImageBackground,
  StyleSheet,
} from 'react-native';
import * as Progress from 'react-native-progress';
import * as moment from 'moment';

namespace TimerMovement {
  export interface Props {
    duration: moment.Duration
    time: moment.Duration
    mode: 'WORK' | 'BREAK'
  }
}
export default class TimerMovement extends React.Component<TimerMovement.Props> {
  render() {
    // const half = this.props.duration.asMilliseconds() / 2;

    const progress = (this.props.duration.asMilliseconds() - this.props.time.asMilliseconds()/2) / this.props.duration.asMilliseconds();
    return (
      <ImageBackground
        source={require('../assets/Timer/timerBgBlue.png')}
        style={styles.wrapper}
        imageStyle={styles.wrapperImage}
      >
        <Progress.Circle
          progress={progress}
          size={300}
          direction={'counter-clockwise'}
          color={this.props.mode === 'WORK' ? '#ffffff' : '#377FD8'}
          style={styles.progress}
        />
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
    width: 300
  },
  wrapperImage: {
    width: 150,
  },
  progress: {
    transform: [
      { scaleX: -1 },
      { scaleY: -1 }
    ]
  }
})