import React from 'react'
import Tags from './Tags'
import Home from './Home'
import InitRepo from './InitRepo'
import './global.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'

const routes = [
  Home,
  Tags,
  InitRepo,
]

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const { data } = response
  const successful = data.successful
  if (successful !== '1') {
    message.error(JSON.stringify(data))
  }
  return data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  message.error(JSON.stringify(error))
  return Promise.resolve(error);
});


function Root(props) {
  return (
    <div id='container'>
      <Router>
        <Switch>
          {
            routes.map(route => {
              return <Route {...route} exact/>
            })
          }
          <Route children={() => <div>page not found</div>}/>
        </Switch>
      </Router>
    </div>
  )
}

export default Root
