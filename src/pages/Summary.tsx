import React from 'react'
import PageLayout from '../components/PageLayout'
import Header from '../components/Header'
import DateSelector from '../components/DateSelector'
import SummaryGraph from '../components/SummaryGraph'
import SummaryMeta from '../components/SummaryMeta'
import GraphModeSelector from '../components/GraphModeSelector'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

namespace Summary {
  export interface Props {
    sessionsCount: number
    todosCount: number
  }
  export interface State {
    selectedMode: string
    currentDate: any
  }
}

class Summary extends React.Component<Summary.Props, Summary.State> {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: moment().format('YYYY.MM.DD'),
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
        }}
      >
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

  goToNextDay = () => {
    this.setState({
      currentDate: moment(this.state.currentDate)
        .add(1, 'days')
        .format('YYYY.MM.DD'),
    })
  }
  goToPrevDay = () => {
    this.setState({
      currentDate: moment(this.state.currentDate)
        .add(-1, 'days')
        .format('YYYY.MM.DD'),
    })
  }
  render() {
    return (
      <PageLayout statusBarBackgroundColor="white">
        <Header />
        <DateSelector
          currentDate={this.state.currentDate}
          onNextDayClick={this.goToNextDay}
          onPrevDayClick={this.goToPrevDay}
          selectedMode={this.state.selectedMode}
        />
        <GraphModeSelector
          selectedMode={this.state.selectedMode} // week, month
          onSelectDay={() => this.onChangeSelectedMode('day')}
          onSelectWeek={() => this.onChangeSelectedMode('week')}
          onSelectMonth={() => this.onChangeSelectedMode('month')}
        />
        <SummaryGraph
          mode={this.state.selectedMode}
          currentDate={this.state.currentDate}
        />
        <SummaryMeta
          todosCount={this.props.todosCount}
          blueberriesCount={this.props.sessionsCount}
          totalTime="99시간 40분"
        />
      </PageLayout>
    )
  }
}

export default connect(state => ({
  sessionsCount: state.app.sessions.length,
  todosCount: state.app.todos.length,
}))(Summary)
