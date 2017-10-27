import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import Routes from './root'
import reducers from './reducers'

const Root = () => (
  <Provider store={ createStore(reducers, applyMiddleware(thunk)) }>
    <Routes />
  </Provider>
)

render(<Root />, document.getElementById('app'))
