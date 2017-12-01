import React from 'react'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import DateSelector from '../components/DateSelector'
import SummaryGraph from '../components/SummaryGraph'
import SummaryMeta from '../components/SummaryMeta'
import { View, Image } from 'react-native'
import moment from 'moment'

export default class Summary extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        {focused ? (
          <Image
            source={require('../assets/Summary/summary_active.png')}
            style={{ height: 26, width: 28, marginTop: 6 }}
          />
        ) : (
          <Image
            source={require('../assets/Global/summary_default.png')}
            style={{ height: 18, width: 22, marginTop: 3 }}
          />
        )}
      </View>
    ),
  }

  render() {
    return (
      <PageLayout statusBarBackgroundColor={'rgb(217, 217, 217)'}>
        <Header />
        <DateSelector currentDate={moment().format('YYYY.MM.DD')} />
        <SummaryGraph />
        <SummaryMeta />
      </PageLayout>
    )
  }
}
