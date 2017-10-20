import React from 'react'
import { render } from 'react-dom'
import { hashHistory, Router, Route } from 'react-router'

const Routes = () => (
  <Router history={ hashHistory }>
    <Route path='first' component={ require('./first') } />
    <Route path='second' component={ require('./second') } />
  </Router>
)

render(<Routes>, document.getElementById('app'))
