import React from 'react'
import { Link } from 'react-router'

const SecondPage = () => (
  <div>
    <p>this is second page!</p>
    <Link to='/first'>去第一页</Link>
  </div>
)

export default SecondPage
