import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import { subColor, fontColor } from '../config'

class Search extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.SearchWrapper}>
        {/* <View style={styles.btnWrapper}> */}
        <TextInput
          style={{
            fontSize: 14,
            color: fontColor.main,
          }}
          placeholder="검색"
          onChangeText={text => this.setState({ text })}
          editable={true}
          autoFocus={true}
          placeholderTextColor={fontColor.sub}
          numberOfLines={4}
        />
        {/* </View> */}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: 'gray',
    shadowOffset: { height: 10, width: 0 },
    zIndex: 10
  },
  btnWrapper: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: subColor.dark,
    height: 30
  },
  searchBtnWrapper: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Search
