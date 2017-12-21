import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import Summary from './pages/Summary'
import Settings from './pages/Settings'
import Work from './pages/Work'
import WorkModal from './pages/WorkModal'
import Todo from './pages/Todo'
import Loading from './components/Loading'
import configureStore from './store'
import { subColor } from './config'

const MainNavigator = TabNavigator(
  {
    Summary: { screen: Summary },
    Todo: { screen: Todo },
    Work: { screen: Work },
    Settings: { screen: Settings },
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 60,
        borderTopWidth: 0,
        backgroundColor: subColor.pale,
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

const AppNavigator = StackNavigator(
  {
    Home: { screen: MainNavigator },
    WorkModal: { screen: WorkModal },
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white',
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
