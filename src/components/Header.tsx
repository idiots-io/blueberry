import React from 'react'
import moment from 'moment'
import { View, StyleSheet, Text, Image } from 'react-native'
import { fontColor } from '../config'
import { connect } from 'react-redux'
import { Session } from '../reducers'

namespace HeaderComponent {
  export interface Props {
    todaySessions: Session[]
  }
}

class Header extends React.Component<HeaderComponent.Props, {}> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.headerWrapper}>
        <Image source={require('../assets/Global/logo_upper.png')} />
        <Text style={styles.headerText}>
          오늘{' '}
          <Text style={{ color: fontColor.blue }}>
            블루베리{' '}
            <Text style={{ fontWeight: 'bold' }}>
              {this.props.todaySessions.length}
            </Text>
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
    alignItems: 'center',
  },
  headerText: {
    color: fontColor.sub,
  },
})

export default connect(
  state => ({
    todaySessions: state.app.sessions.filter((session: Session) =>
      moment(session.createdAt).isSame(new Date(), 'day'),
    ),
  }),
  undefined,
)(Header)
