import React from 'react'
import { Link } from 'react-router'

const Home = ({ children }) => (
  <div className='home'>
    { children }
    <h1>默认页</h1>
    <Link to='/first'>去第一页</Link>
    <Link to='/second'>去第二页</Link>
  </div>
)

export default Home
