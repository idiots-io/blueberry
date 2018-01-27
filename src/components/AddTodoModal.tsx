import React from 'react'
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Image,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { mainColor, fontFamily, fontColor } from '../config'
import { connect } from 'react-redux'
import { addTodo } from '../actions/todos'
import * as moment from 'moment'
import 'moment/locale/ko'
import uuid from 'uuid/v4'

namespace AddTodoModalComponent {
  export interface Props {
    visible: boolean
    close: any
    addTodo: any
  }
  export interface State {
    text: string
  }
}
class AddTodoModal extends React.Component<
  AddTodoModalComponent.Props,
  AddTodoModalComponent.State
  > {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
  }
  addTodo = () => {
    this.props.addTodo({
      id: uuid.v4(),
      title: this.state.text,
      isDone: false,
      createdAt: moment.utc().format('L') + ' ' + moment.utc().format('dddd'),
      sessionCount: 0,
    })
    this.props.close()
  }
  render(): JSX.Element {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          alert('Modal has been closed.')
        }}
      >
        <View style={styles.modalBox}>
          <View style={styles.contentsAlign}>
            <View style={{
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.props.close}
                style={{ width: 20, height: 20, position: 'absolute', right: 0, top: 15 }}>
                <Image
                  source={require('../assets/Todo/close.png')}
                />
              </TouchableOpacity>
              <View style={{ marginTop: 25 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'white' }}>
                    {moment.utc().format('L')}{' '}
                  </Text>
                  <Text style={{ color: 'white' }}>
                    {moment.utc().format('dddd')}
                  </Text>
                </View>
                <TextInput
                  style={{
                    height: (Dimensions.get('window').height - 150) / 2,
                    fontSize: 40,
                    color: 'white',
                    marginTop: 5,
                  }}
                  placeholder=" 할일 추가"
                  onChangeText={text => this.setState({ text })}
                  editable={true}
                  multiline={true}
                  autoFocus={true}
                  placeholderTextColor="#9CB9EF"
                  // maxLength={40}
                  numberOfLines={4}
                />
              </View>
            </View>
            <KeyboardAvoidingView behavior="position">
              <View style={styles.btnAlign}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.addTodo()}
                >
                  <ImageBackground
                    style={styles.btnWrapper}
                    source={require('../assets/Todo/modalAddBtn.png')} >
                    <Text style={styles.addTodoText}>추가하기</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal >
    )
  }
}

const styles = StyleSheet.create({
  btnAlign: {
    left: (Dimensions.get('window').width - 256) / 2,
  },
  btnWrapper: {
    width: 226,
    height: 50,
    bottom: 30,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTodoText: {
    fontFamily: fontFamily.light,
    letterSpacing: -0.3,
    backgroundColor: 'transparent',
    marginBottom: 4,
    color: fontColor.blue,
    fontSize: 16
  },
  modalBox: {
    backgroundColor: mainColor.default,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flex: 1,
    zIndex: 10,
  },
  contentsAlign: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
    justifyContent: 'space-between',
  },
})

const mapDispatchToProps = (dispatch: any): any => {
  return {
    addTodo: todo => dispatch(addTodo(todo)),
  }
}

export default connect(undefined, mapDispatchToProps)(AddTodoModal)
