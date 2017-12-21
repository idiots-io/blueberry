import React from 'react';
import {
  TextStyle,
  Text,
} from 'react-native';
import * as moment from 'moment';

namespace Timer {
  export interface Props {
    time: moment.Duration
    mode: 'WORK' | 'BREAK'
  }
}
export default class Timer extends React.Component<Timer.Props> {
  render() {
    return (
      <Text style={{ ...style, color: this.props.mode === 'WORK' ? '#ffffff' : '#377FD8'}}>
        {moment.utc((this.props.time as any)._data).format('mm:ss')}
      </Text>
    )
  }
}

const style: TextStyle = {
  backgroundColor: 'transparent',
  fontSize: 72
}