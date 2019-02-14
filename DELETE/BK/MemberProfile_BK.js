import React, { Component } from 'react';
import API from '../api_helper';

import UpdateUserInfoBox from './UpdateUserInfoBox';


class MemeberProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      memberInfo: {},
      memberAddress: {}
    }
  }

componentDidMount(){
  this.loadMemberInfo()
}


loadMemberInfo(){
  API.loadUserByToken(JSON.parse(localStorage.the_main_app).token)
    .then( member => {
      this.setState({
        memberInfo: member.data,
        memberAddress: member.data.shipping_address
      })
    })
}

openUpdateUserInfoBox(){
  document.querySelector('.memberProfile').classList.toggle("hide")
  document.querySelector('.updateUserInfoBox').classList.toggle("hide")
}

closeProfileUpdateBox(){
  document.querySelector(".memberProfileBlock").classList.toggle("hide")
}

  render(){
    if(!this.state.memberInfo){
      console.log("wait")
    }
    const {recipient_name, address1, address2, city, state, zipcode, country, phone} = this.state.memberAddress;

    return(
      <div className="profile-block">
        <div className="profile-box-block">
          <button className="profile-box-close" onClick={this.closeProfileUpdateBox.bind(this)}>X</button>
        </div>
        <div className="profile-container">
            <img className="imgforcart" src="https://static.thenounproject.com/png/630729-200.png" />
        </div>

        <div className="memberProfile">
          <h2>Profile Edit</h2>
          <p>NAME: {(`${this.state.memberInfo.username}`)? this.state.memberInfo.username:""}</p>
          <p>E-Mail: {this.state.memberInfo.email}</p>
          <p>Phone Number: {phone}</p>
          <p><b>Shipping Address: </b></p>
          <p>address1: {address1}</p>
          <p>address2: {address2}</p>
          <p>city: {city}</p>
          <p>state: {state}</p>
          <p>zipcode: {zipcode}</p>
          <button onClick={this.openUpdateUserInfoBox.bind(this)}>UPDATE</button>
        </div>
        <div className="updateUserInfoBox hide">
          <UpdateUserInfoBox />
        </div>

        <div>
          <h2>Purchase History</h2>
        </div>
      </div>
    )
  }
}

export default MemeberProfile;
