import React from 'react'
import { hashHistory, Router, Route } from 'react-router'

import Home from './containers/home'

const routes = {
  // 根路由配置
  // 路径名设置
  path: '/',
  // componet属性对应该层路由及子路由的默认组件，可以不写，这样只加载indexRoute对应组件
  // component: Home,
  // indexRoute属性对应该级路由特有的的组件，其子路由中组件不会加载，可以不写
  indexRoute: { component: Home },
  // 子路由配置
  childRoutes: [
    {
      path: 'first',
      // 按需加载的配置，当路径名称是所有父级路由 + 当前路径名时，才会去引入该路径对应的组件
      getComponent(location, cb) {
        System.import('./containers/first').then(module => cb(null, module.default))
      }
    },
    {
      path: 'second',
      getComponent(location, cb) {
        System.import('./containers/second').then(module => cb(null, module.default))
      }
    }
  ]
}

const Routes = () => <Router history={ hashHistory } routes={ routes } />

export default Routes


// error: 因为First组件时使用es6的export default输出的，所以只能通过import来引入
// const Routes = () => (
//   <Router history={ hashHistory }>
//     <Route path='first' component={ require('./containers/first') } />
//     <Route path='second' component={ require('./containers/second') } />
//   </Router>
// )

// 需使用react-router-loader来解析这种写法
// const Routes = () => (
//   <Router history={ hashHistory }>
//     <Route path='first' component={ require('react-router?name=first!./containers/first') } />
//     <Route path='second' component={ require('react-router?name=second!./containers/second') } />
//   </Router>
// )
