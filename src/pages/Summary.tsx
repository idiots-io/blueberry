import React from 'react'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import DateSelector from '../components/DateSelector'
import SummaryGraph from '../components/SummaryGraph'
import SummaryMeta from '../components/SummaryMeta'
import GraphModeSelector from '../components/GraphModeSelector'
import { View, Image } from 'react-native'
import moment from 'moment'

export default class Summary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: moment(),
      selectedMode: 'day',
    }
  }

  onChangeSelectedMode = (mode /* 'day', 'week', 'month' */) => {
    this.setState({
      selectedMode: mode,
    })
  }

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
        <DateSelector
          currentDate={moment().format('YYYY.MM.DD')}
          onNextDayClick={() => console.log('Go to next date')}
          onPrevDayClick={() => console.log('Go to previous date')}
        />
        <GraphModeSelector
          selectedMode={this.state.selectedMode} // week, month
          onSelectDay={() => this.onChangeSelectedMode('day')}
          onSelectWeek={() => this.onChangeSelectedMode('week')}
          onSelectMonth={() => this.onChangeSelectedMode('month')}
        />
        <SummaryGraph />
        <SummaryMeta />
      </PageLayout>
    )
  }
}
