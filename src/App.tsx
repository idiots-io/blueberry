import { TabNavigator } from 'react-navigation'
import Settings from './pages/Settings'
import Summary from './pages/Summary'
import Timer from './pages/Timer'
import Todo from './pages/Todo'

export default TabNavigator({
  Todo: { screen: Todo },
  Timer: { screen: Timer },
  Summary: { screen: Summary },
  Settings: { screen: Settings }
})
