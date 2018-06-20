// src/App.js

import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import Profile from './components/Profile/Profile';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            {/* <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button> */}

            {
              !isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>



                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                      <p>{console.log(this.props.auth)}</p>
                      <p>{console.log(this.props.auth.auth0)}</p>
                    Log Out
                    <Profile auth={this.props.auth} {...this.props} />
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
      </div>
    )
  }
}

export default App;
