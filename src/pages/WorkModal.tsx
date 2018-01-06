import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { NavigationNavigatorProps } from 'react-navigation';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as moment from 'moment';
import uuid from 'uuid/v4';
import { filter } from 'lodash';

import { addSession } from '../actions/sessions';
import { Action, Session } from '../reducers';

import { Work } from './Work';
import SurrenderDialog from '../components/SurrenderDialog';
import SurrenderBtn from '../components/SurrenderBtn';
import PlayAndPauseBtn from '../components/PlayAndPauseBtn';
import Timer from '../components/Timer';
import TimeMovement from '../components/TimerMovement';

enum Mode {
  WORK = 'WORK',
  BREAK = 'BREAK',
}
namespace WorkModal {
  export interface Props {
    navigation: any
    addSession: (session: Session) => Action
    timers: Work[];
    settings: {
      workInterval: {
        labelKor: string;
        value: moment.Duration;
      }
      breakTime: {
        labelKor: string;
        value: moment.Duration;
      }
      autoStart: {
        labelKor: string;
        value: boolean;
      }
    }
  }
  export interface State {
    time: moment.Duration
    countDown?: any
    mode: 'WORK' | 'BREAK'
    isOpenSurrenderDialog: boolean
  }
}
class WorkModal extends React.Component<WorkModal.Props & NavigationNavigatorProps<{ params: { work: Work }}>, WorkModal.State> {
  constructor(props) {
    super(props)
    this.state = {
      mode: Mode.WORK,
      isOpenSurrenderDialog: false,
      time: moment.duration(this.props.settings.workInterval.value),
      countDown: setInterval(() => {
        this.setState({ time: this.state.time.subtract(1, 's') });
        if (this.state.time.asMilliseconds() <= 0) {
          this._clearCountDown();
          (this.state.mode === 'WORK') && this._addSession();
          this._changeMode();
        }
      }, 1000),
    }
  }

  _playCountDown = () => {
    this.setState({
      countDown: setInterval(() => {
        this.setState({ time: this.state.time.subtract(1, 's') });
        if (this.state.time.asMilliseconds() <= 0) {
          this._clearCountDown();
          (this.state.mode === 'WORK') && this._addSession();
          this._changeMode();
        }
      }, 1000), 
    })
  }

  _clearCountDown = () => {
    clearInterval(this.state.countDown);
    this.setState({ countDown: undefined });
  }

  _changeMode = () => {
    if (this.state.mode === Mode.WORK) {
      this.setState({
        mode: Mode.BREAK,
        time: moment.duration(this.props.settings.breakTime.value),
      });
    } else {  // this.state.mode === Mode.BREAK
      this.setState({
        mode: Mode.WORK,
        time: moment.duration(this.props.settings.workInterval.value),
      });

    }
  }

  _addSession = () => {
    const work = this.props.timers[this.props.navigation.state.params.timerIndex];
    const session: Session = {
      id: uuid(),
      duration: moment.duration(this.props.settings.workInterval.value),
      createdAt: moment.utc().toDate(),
      todoId: work.todo.id
    }
    this.props.addSession(session);
  }

  _renderBottom() {
    if (this.state.mode === Mode.WORK) {
      return (
        <View style={[styles.bottomView, styles.workDialogView]}>
          {this.state.isOpenSurrenderDialog && <SurrenderDialog
            onPressConfirm={() => {
              clearInterval(this.state.countDown);
              this.props.navigation.goBack();
            }}
            onPressCancel={() => {
              this.setState({ isOpenSurrenderDialog: false });
            }}
          />}
        </View>
      )
    } else {
      return (
        <View style={styles.bottomView}>
        <TouchableOpacity activeOpacity={0.8} onPress={this._changeMode}>
          <Text style={[styles.text, styles.skipBreakBtnText]}>← 계속 진행</Text>
        </TouchableOpacity>
        </View>
      );
    }
  }

  _renderFlag() {
    if (this.state.mode === Mode.WORK) {
      return (
        <View style={styles.flagView}>
          <SurrenderBtn
            selected={this.state.isOpenSurrenderDialog}
            onPress={() => { this.setState({ isOpenSurrenderDialog: !this.state.isOpenSurrenderDialog })}}
          />
        </View>
      )
    } else {
      return undefined;
    }
  }

  render() {
    const work = this.props.timers[this.props.navigation.state.params.timerIndex];
    return (
      <LinearGradient
        colors={this.state.mode === 'WORK' ? ['#377fd8', '#4551f6'] : ['#ffffff', '#ffffff']}
        style={styles.background}
      >
        <View style={styles.metadataView}>
          <Text style={[styles.text, styles.sessionsCountText]}>{work.sessionsCount + 1}번째 블루베리</Text>
          <Text style={[styles.text, styles.titleText]}>{work.todo.title}</Text>
        </View>
        <View style={styles.analogView}>
          <Text style={[styles.text, styles.epicText]}>딴짓{"\n"}노노</Text>
          <View style={{ right: -120 }}>
            <TimeMovement
              mode={this.state.mode}
              duration={
                this.state.mode === Mode.WORK
                  ?
                moment.duration(this.props.settings.workInterval.value)
                  :
                moment.duration(this.props.settings.breakTime.value)
              }
              time={this.state.time}
            />
          </View>
        </View>
        <View style={styles.digitalView}>
          <Timer
            time={this.state.time}
            mode={this.state.mode}
          />
          <PlayAndPauseBtn
            mode={this.state.mode}
            pause={!this.state.countDown}
            onPress={!this.state.countDown ? this._playCountDown : this._clearCountDown}
          />
        </View>
        {this._renderBottom()}
        {this._renderFlag()}

      </LinearGradient>
    )
  }
}

interface StyleTypes {
  background: ViewStyle
  text: TextStyle
  metadataView: ViewStyle
  sessionsCountText: TextStyle
  titleText: TextStyle
  analogView: ViewStyle
  epicText: TextStyle
  digitalView: ViewStyle
  bottomView: ViewStyle
  workDialogView: ViewStyle
  skipBreakBtnText: TextStyle
  flagView: ViewStyle
}
const styles = StyleSheet.create<StyleTypes>({
  background: {
    flex: 1,
  },
  text: {
    color: '#D0DAF3',
    backgroundColor: 'transparent'
  },
  metadataView: {
    flex: 2,
  },
  sessionsCountText: {
    paddingTop: 60,
    paddingLeft: 40,
    fontSize: 16
  },
  titleText: {
    paddingLeft: 40,
    fontSize: 32
  },
  analogView: {
    flex: 3,
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  epicText: {
    fontSize: 64,
    opacity: 0.28
  },
  digitalView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomView: {
    flex: 1,
  },
  workDialogView: {
    alignItems: 'center',
  },
  skipBreakBtnText: {
    left: 30,
    fontSize: 20,
    color: '#377FD8'
  },
  flagView: {
    position: 'absolute'
  }
})

export default connect(
  state => ({
    timers: state.app.todos.reduce((result, todo) => {
      const sessionsCount = filter(
        state.app.sessions,
        session => session.todoId === todo.id,
      ).length
      result.push({ todo, sessionsCount })
      return result
    }, []),
    settings: state.app.settings
  }), {
    addSession
  }
)(WorkModal)