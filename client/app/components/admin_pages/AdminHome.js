import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import API from './api-product';
import Logout from './parts/Logout';

class AdminHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: JSON.parse(localStorage.getItem('admin_token'))
    }
  }

  onclick_logout(e){
    e.preventDefault();
    API.adminLogout( this.state.token )
    .then( respond => {
      if(respond.data.success === false){
        alert("logout unsuccessful");
      } else {
        this.props.history.push('/');
      }
    })
  };



  render(){
    return(
    <>
      <h1>ADMIN HOME PAGE</h1>
      <Logout
        onclick_logout = {this.onclick_logout.bind(this)}
      />
      <div className="homeBody">
        <div className="links_to">
        </div>

        <div className="today_order">
        </div>
      </div>
    </>
    )
  }
}

export default AdminHome;
