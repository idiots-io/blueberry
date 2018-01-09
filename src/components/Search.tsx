import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import { fontColor } from '../config'

namespace SearchComponent {
  export interface State {
    text: string;
  }

}

class Search extends React.Component<{}, SearchComponent.State> {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
  }
  render() {
    return (
      <View style={styles.SearchWrapper}>
        <TextInput
          style={{
            fontSize: 14,
            color: fontColor.main,
            flex: 1,
            marginLeft: 15,
          }}
          placeholder="검색"
          onChangeText={text => this.setState({ text })}
          // editable={true}
          autoFocus={true}
          placeholderTextColor={fontColor.sub}
        />
        <TouchableOpacity style={styles.searchBtnWrapper}>
          <Image source={require('../assets/Todo/close_blue.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  SearchWrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center',
    height: 50,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: 'gray',
    shadowOffset: { height: 10, width: 0 },
    zIndex: 10
  },
  searchBtnWrapper: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Search
