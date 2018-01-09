import React from 'react'
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { mainColor } from '../config'
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
      createdAt: new Date(),
      // createdAt: moment.utc().format('L') + ' ' + moment.utc().format('dddd'),
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
            <TouchableOpacity activeOpacity={0.8} onPress={this.props.close}>
              <Image
                source={require('../assets/Todo/close.png')}
                style={{ position: 'absolute', right: 0, top: 15 }}
              />
            </TouchableOpacity>
            <View style={{ marginTop: 20, marginLeft: 15 }}>
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
                  height: Dimensions.get('window').height - 150,
                  fontSize: 40,
                  color: 'white',
                  marginTop: 25,
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
            <KeyboardAvoidingView behavior="position">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.addTodo()}
              >
                <Image
                  source={require('../assets/Todo/addBlueberry.png')}
                  style={{ right: 0, position: 'absolute', bottom: 0 }}
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
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
  addTodoText: {
    marginTop: 5,
    color: 'white',
    fontSize: 18,
  },
})

const mapDispatchToProps = (dispatch: any): any => {
  return {
    addTodo: todo => dispatch(addTodo(todo)),
  }
}

export default connect(undefined, mapDispatchToProps)(AddTodoModal)
