import React from 'react'
import { TabNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import Settings from './pages/Settings'
import Summary from './pages/Summary'
import Timer from './pages/Timer'
import Todo from './pages/Todo'
import Loading from './components/Loading'
import configureStore from './store'

const AppNavigator = TabNavigator({
  Todo: { screen: Todo },
  Timer: { screen: Timer },
  Summary: { screen: Summary },
  Settings: { screen: Settings }
})

const { persistor, store } = configureStore()

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Loading />}>
      <AppNavigator />
    </PersistGate>
  </Provider>
)
