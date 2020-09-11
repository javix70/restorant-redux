import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
// Te permite utilizar funciones asincronas

import reducer from "./reducer"

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
)

export default store
