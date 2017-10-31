import React from 'react'
import { TabNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import Settings from './pages/Settings'
import Summary from './pages/Summary'
import Timer from './pages/Timer'
import Todo from './pages/Todo'
import store from './store'

const AppNavigator = TabNavigator({
  Todo: { screen: Todo },
  Timer: { screen: Timer },
  Summary: { screen: Summary },
  Settings: { screen: Settings }
})

export default () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
)
