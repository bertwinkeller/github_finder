import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar.js'
import Users from './components/Users.js'
import Search from './components/Search.js'
import Alert from './components/Alert.js'
import About from './components/pages/About.js'
import User from './components/User.js'

import axios from 'axios'

import GithubState from './context/github/githubState'


const App = () => {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)




  const searchUsers = async text => {

    setLoading(true)

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUsers(res.data.items)
    setLoading(false)
  }

  const getUser = async (username) => {

    setLoading(true)


    const res = await axios.get(`https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUser(res.data)
    setLoading(false)

  }


  //Get User Repos
  const getUserRepos = async (username) => {

    setLoading(true)


    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setRepos(res.data)
    setLoading(false)

  }

  //Clear Users
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 3000)
  }


  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Search searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={props => (
                <User {...props} getUser={getUser} user={user} getUserRepos={getUserRepos} repos={repos} loading={loading} />
              )} />
            </Switch>

          </div>
        </div>
      </Router>
    </GithubState>
  );


}

export default App;
