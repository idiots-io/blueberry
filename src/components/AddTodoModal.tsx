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
  export interface Props {}
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
        visible={true}
        onRequestClose={() => {
          alert('Modal has been closed.')
        }}
      >
        <View style={styles.modalBox}>
          <View style={styles.contentsAlign}>
            <View style={{ marginTop: 50, marginLeft: 15 }}>
              <Text style={{ color: 'white' }}>2017.11.11. 화요일</Text>
              <TextInput
                style={{ height: 100, fontSize: 40, color: 'white' }}
                placeholder="할일 추가"
                onChangeText={text => this.setState({ text })}
                editable={true}
                maxLength={40}
              />
            </View>
            <KeyboardAvoidingView behavior="position">
              <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                <Image
                  source={require('../assets/Todo/addBlueberry.png')}
                  style={{
                    // position: 'absolute',
                    // justifyContent: 'flex-end',
                    // bottom: 0,
                    // flex: 1,
                    // alignItems: 'flex-end',
                    right: 0,
                  }}
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
