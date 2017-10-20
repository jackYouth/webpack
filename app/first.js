import React from 'react'
import { Link } from 'react-router'

import '../styles/app.css'

const sum = require('./sum')

const FirstPage = () => (
  <div id='app'>
    <p>this is first page</p>
    <p>{ `10 + 11 = ${ sum(10, 11) }` }</p>
    <img src={ require('../images/1.jpg') } alt='alalei_1' />
    <img src={ require('../images/2.jpg') } alt='alalei_2' />
    <Link to='/second'>去第二页</Link>
  </div>
)

export default FirstPage
