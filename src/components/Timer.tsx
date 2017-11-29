import React from 'react';
import {
  TextStyle,
  Text,
} from 'react-native';
import * as moment from 'moment';

namespace Timer {
  export interface Props {
    time: moment.Duration
    onFinish: () => void
  }
  export interface State {
    time: moment.Duration
    countDown: any
  }
}
export default class Timer extends React.Component<Timer.Props, Timer.State> {
  constructor(props) {
    super(props)
    this.state = {
      time: this.props.time,
      countDown: setInterval(() => {
        this.setState({
          time: this.state.time.subtract(1, 's')
        })
      }, 1000)
    }
  }

  componentDidUpdate() {
    if (this.state.time.asMilliseconds() <= 0) {
      clearInterval(this.state.countDown)
      this.props.onFinish()
    }
  }

  render() {
    return (
      <Text style={style}>{moment.utc((this.state.time as any)._data).format('mm:ss')}</Text>
    )
  }
}

const style: TextStyle = {
  color: 'white',
  backgroundColor: 'transparent',
  fontSize: 72
}