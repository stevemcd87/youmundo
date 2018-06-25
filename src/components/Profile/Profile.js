// src/Profile/Profile.js

import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
// import './Profile.css';

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          {/* <span>{profile.name}</span> */}
          <Panel header="Profile">
            <img className="profile-img" src={profile.picture} alt="profile" />
            {/* <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre> */}
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
