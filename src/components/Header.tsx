import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { fontColor } from '../config'
import { connect } from 'react-redux'

class Header extends React.Component {
  render() {
    return (
      <View style={styles.headerWrapper}>
        <Image source={require('../assets/Global/logo_upper.png')} />
        <Text style={styles.headerText}>
          오늘{' '}
          <Text style={{ color: fontColor.blue }}>
            뽀모도로 <Text style={{ fontWeight: 'bold' }}>{this.props.todos.length}</Text>
          </Text>
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: 'rgb(245, 245, 245)',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    color: fontColor.sub
  }
})

export default connect(
  state => ({
    todos: state.app.todos,
  }), undefined
)(Header)