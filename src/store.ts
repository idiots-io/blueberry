import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers' // where reducers is a object of reducers

const config = {
  key: 'root',
  storage,
}

const createStoreWithMiddleware = applyMiddleware(logger)(createStore)

const reducer = persistCombineReducers(config, { app: reducers })

export default () => {
  const store = createStoreWithMiddleware(reducer)
  const persistor = persistStore(store)
  // persistor.purge()
  return { persistor, store }
}
