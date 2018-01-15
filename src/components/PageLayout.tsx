import React from 'react'
import { View } from 'react-native'
const SafeArea = require('react-native-safe-area')
import { Action } from '../reducers'
import { connect } from 'react-redux'
import { getSafeAreaMargin } from '../actions/todos'

export interface SafeAreaInsets {
  top: number
  left: number
  bottom: number
  right: number
}

namespace PageLayout {
  export interface Props {
    getSafeAreaMargin: (margin: number) => Action
  }
  export interface State {
    safeAreaInsets: SafeAreaInsets
  }
}

class PageLayout extends React.Component<PageLayout.Props, PageLayout.State>{
  state = {
    safeAreaInsets: {
      top: 0, left: 0, bottom: 0, right: 0,
    }
  }

  componentWillMount() {
    SafeArea.default.__proto__.getSafeAreaInsetsForRootView()
      .then((result) => {
        const { safeAreaInsets } = result
        this.setState({ safeAreaInsets })
      })
  }

  componentDidMount() {
    // Add event listener
    SafeArea.default.__proto__.addEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsForRootViewChange)
    this.props.getSafeAreaMargin(34)
  }

  componentWillUnmount() {
    // Remove event listener
    SafeArea.default.__proto__.removeEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsForRootViewChange)
  }

  onSafeAreaInsetsForRootViewChange = (result: { safeAreaInsets: SafeAreaInsets }) => {
    const { safeAreaInsets } = result
    this.setState({ safeAreaInsets })
  }

  render() {
    const { safeAreaInsets } = this.state
    return (
      <View style={{
        marginTop: safeAreaInsets.top,
        marginLeft: safeAreaInsets.left,
        marginBottom: safeAreaInsets.bottom,
        marginRight: safeAreaInsets.right,
      }}>
        {this.props.children}
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSafeAreaMargin: (bottom) => dispatch(getSafeAreaMargin(bottom))
  }
}

export default connect(undefined, mapDispatchToProps)(PageLayout) 
