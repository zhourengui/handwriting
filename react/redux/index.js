// 1. createStore
// 2. applyMiddleware
// 3. bindActionCreators
// 4. combineReducer

import createStore from "./createStore.js"
import logger from "./logger/index.js"
import applyMiddleware from "./applyMiddleware.js"
import bindActionCreators from "./bindActionCreators.js"
import combineReducer from "./combineReducer.js"
import createThunkMiddleware from "./redux-thunk/index.js"
import reduxPromise from "./redux-promise/index.js"

export {
  createStore,
  logger,
  applyMiddleware,
  bindActionCreators,
  combineReducer,
  createThunkMiddleware,
  reduxPromise,
}
