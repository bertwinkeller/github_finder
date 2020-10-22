import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar.js'
import Users from './components/Users.js'
import Search from './components/Search.js'


import axios from 'axios'
class App extends Component {

  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {

    this.setState({loading: true})

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ users: res.data, loading: false})
  }

  searchUsers= async text => {

    this.setState({loading: true})
      
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ users: res.data.items, loading: false})
  }

  clearUsers = () => this.setState({ users: [], loading: false})
  
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}/>
        <Users loading={this.state.loading} users={this.state.users}/>
        </div>
      </div>
    );
  }

}

export default App;
