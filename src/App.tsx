import React from 'react'
import { TabNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import Settings from './pages/Settings'
import Summary from './pages/Summary'
import Work from './pages/Work'
import Todo from './pages/Todo'
import Loading from './components/Loading'
import configureStore from './store'
import { subColor } from './config'

const AppNavigator = TabNavigator(
  {
    Todo: { screen: Todo },
    Timer: { screen: Work },
    Summary: { screen: Summary },
    Settings: { screen: Settings },
  },
  {
    animationEnabled: true,
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
