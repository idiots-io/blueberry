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

namespace AddTodoModalComponent {
  export interface Props {
    visible: boolean
    close: any
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
  render(): JSX.Element {
    return (
      // <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
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
              <Text style={{ color: 'white' }}>2017.11.11. 화요일</Text>
              <TextInput
                style={{
                  height: Dimensions.get('window').height - 150,
                  fontSize: 40,
                  color: 'white',
                  marginTop: 25,
                }}
                placeholder="할일 추가"
                onChangeText={text => this.setState({ text })}
                editable={true}
                multiline={true}
                autoFocus={true}
                // maxLength={40}
                numberOfLines={4}
              />
            </View>
            <KeyboardAvoidingView behavior="position">
              <TouchableOpacity
                activeOpacity={0.8}
                // onPress={onPress}
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

export default AddTodoModal
