import React, { Component } from 'react';
import API from '../api_helper'
// Parts

import Logout from './Logout';
import CartItem from './cartItem';

class MemberHeader extends Component {

  // onclick_logout(e){
  //   e.preventDefault();
  //   axios.get(`/api/user/logout?token=${this.state.token}`)
  //   .then( respond => {
  //     if(respond.data.success === false){
  //       alert("logout unsuccessful");
  //     } else {
  //       window.location = '/';
  //     }
  //   })
  // };

  onclick_logout(e){
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('the_main_app')).token

    API.memberLogout(token)
      .then( respond => {
        if(respond.data.success === false){
          alert("logout unsuccessful");
        } else {
          window.location = '/';
        }
      })
  };

  showProfileBlock(){
    document.querySelector(".memberProfileBlock").classList.toggle("hide")
  }

  render(){
    return(
      <>
        <div className="col-12 inline_block">
          <div className="fLeft"><button onClick={this.showProfileBlock.bind(this)}>Profile Update</button></div>
          <div className="fLeft"><Logout onclick_logout={this.onclick_logout.bind(this)}/></div>
          <div className="fLeft"><CartItem /></div>
        </div>
      </>
    )
  }
}

export default MemberHeader;
