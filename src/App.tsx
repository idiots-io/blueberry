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
import { subColor } from './config'

const AppNavigator = TabNavigator(
  {
    Settings: { screen: Settings },
    Todo: { screen: Todo },
    Timer: { screen: Timer },
    Summary: { screen: Summary },
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 60,
        borderTopWidth: 0,
        backgroundColor: subColor.pale,
        paddingVertical: 15,
      },
      tabStyle: {
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      labelStyle: {
        marginBottom: 7,
      },
    },
  },
)

const { persistor, store } = configureStore()

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Loading />}>
      <AppNavigator />
    </PersistGate>
  </Provider>
)
