import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import reducers from './reducers' // where reducers is a object of reducers

const config = {
  key: 'root',
  storage
}

const createStoreWithMiddleware = applyMiddleware(logger)(createStore)

const reducer = persistCombineReducers(config, { reducers })

export default () => {
  const store = createStoreWithMiddleware(reducer)
  const persistor = persistStore(store)
  return { persistor, store }
}
