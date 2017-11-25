import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  Modal,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as moment from 'moment';
import uuid from 'uuid/v4';

import { addSession } from '../actions/sessions';
import { Action, Session } from '../reducers';

import { Work } from './Work';
import SurrenderBtn from '../components/SurrenderBtn';
import PlayAndPauseBtn from '../components/PlayAndPauseBtn';
import Timer from '../components/Timer';

namespace WorkModal {
  export interface Props {
    work: Work
    duration: moment.Duration
    visible: boolean
    onClose: () => void
    addSession: (session: Session) => Action
  }
}
class WorkModal extends React.Component<WorkModal.Props> {
  addSession = () => {
    const session: Session = {
      id: uuid(),
      duration: this.props.duration,
      createdAt: moment.utc().toDate(),
      todoId: this.props.work.todo.id
    }
    this.props.addSession(session);
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
      >
        <LinearGradient colors={['#377fd8', '#4551f6']} style={styles.background}>
          <View style={styles.metadataView}>
            <Text style={[styles.text, styles.sessionsCountText]}>{this.props.work.sessionsCount}번째 블루베리</Text>
            <Text style={[styles.text, styles.titleText]}>{this.props.work.todo.title}</Text>
          </View>
          <View style={styles.analogView}>
            <Text style={[styles.text, styles.epicText]}>딴짓{"\n"}노노</Text>
          </View>
          <View style={styles.digitalView}>
            <Timer
              time={moment.duration(3, 's')}
              onFinish={() => {
                this.addSession()
                this.props.onClose()
              }}
            />
            <PlayAndPauseBtn />
          </View>
          <View style={styles.flagView}>
            <SurrenderBtn/>
          </View>
        </LinearGradient>
      </Modal>
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
  flagView: ViewStyle
}
const styles = StyleSheet.create<StyleTypes>({
  background: {
    flex: 1,
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  metadataView: {
    flex: 1,
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
    flex: 2,
    justifyContent: 'center',
  },
  epicText: {
    fontSize: 64,
    opacity: 0.28
  },
  digitalView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flagView: {
    flex: 1,
  }
})

export default connect(
  state => ({
    sessions: state.app.sessions
  }), {
    addSession
  }
)(WorkModal)