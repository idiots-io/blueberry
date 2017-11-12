import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: 'black'
  },
  text: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15
  }
})

namespace Hr {
  export interface Props {
    lineStyle?: object
    trailingLineStyle?: object
    leadingLineStyle?: object
    textStyle?: object
    text?: string
    textWrapperStyle?: object
    marginLeft?: number
    marginRight?: number
    hrStyle?: object
  }
}

class Hr extends Component<Hr.Props> {
  constructor(props) {
    super(props)

    this.renderLine = this.renderLine.bind(this)
    this.renderText = this.renderText.bind(this)
    this.renderInner = this.renderInner.bind(this)
  }

  renderLine(key = 1) {
    // text 앞의 line에 대한 스타일
    if (key === 1 && this.props.text) {
      return (
        <View
          key={key}
          style={[
            styles.line,
            this.props.lineStyle,
            this.props.leadingLineStyle
          ]}
        />
      )
      // text 뒤의 line에 대한 스타일
    } else if (key === 3 && this.props.text) {
      return (
        <View
          key={key}
          style={[
            styles.line,
            this.props.lineStyle,
            this.props.trailingLineStyle
          ]}
        />
      )
    }
    // 기본
    return <View key={key} style={[styles.line, this.props.lineStyle]} />
  }

  renderText(key) {
    return (
      <View key={key} style={this.props.textWrapperStyle}>
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.text}
        </Text>
      </View>
    )
  }

  renderInner() {
    if (!this.props.text) {
      return this.renderLine()
    }
    return [this.renderLine(1), this.renderText(2), this.renderLine(3)]
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: this.props.marginLeft,
          marginRight: this.props.marginRight,
          ...this.props.hrStyle
        }}>
        {this.renderInner()}
      </View>
    )
  }
}

export default Hr
