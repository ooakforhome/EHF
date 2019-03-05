import React, { Component } from 'react';
import API from '../api_helper';

import UpdateUserInfoBox from './MemberProfileParts/UpdateUserInfoBox';
import OrderHistory from './MemberProfileParts/OrderHistory';
// import OrderHistory from './MemberProfileParts/OrderHistory';

class MemeberProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      memberInfo: {},
      memberAddress: {},
      purchases: [],
      infoPage: true,
      orderHistory:false,
      updatePage: false
    }

  }

  componentWillMount(){
    this.loadMemberInfo()
  }

  loadMemberInfo(){
    const { shipping_address, username, recipient_name, address1, address2, city, state, zipcode, country, phone } = member.data.shipping_address;

    API.userLimitedInfo(JSON.parse(localStorage.the_main_app).token)
      .then( member => {
        this.setState({
          purchases: member.data.order_history,
          memberInfo: member.data,
          memberAddress: member.data.shipping_address,
          username,
          recipient_name,
          address1,
          address2,
          city,
          state,
          zipcode,
          country,
          phone,
        })
      })
  }

  memberAddressChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updateSubmit(e){
    e.preventDefault();
    const tkid = JSON.parse(localStorage.getItem("the_main_app")).token;
    API.loadUserIdByToken(tkid)
      .then(info => {
        API.updateUserInfo( info.data , {
          username: this.state.username,
          shipping_address : {
            recipient_name : this.state.recipient_name,
            address1 : this.state.address1,
            address2 : this.state.address2,
            city : this.state.city,
            state : this.state.state,
            zipcode : this.state.zipcode,
            country : "USA",
            phone : this.state.phone
            }
          })
          .then( updatedAddress => {
            this.setState({
              memberInfo: updatedAddress.data,
              memberAddress: updatedAddress.data.shipping_address,
              username: updatedAddress.data.username,
              recipient_name: updatedAddress.data.shipping_address.recipient_name,
              address1: updatedAddress.data.shipping_address.address1,
              address2: updatedAddress.data.shipping_address.address2,
              city: updatedAddress.data.shipping_address.city,
              state: updatedAddress.data.shipping_address.state,
              zipcode: updatedAddress.data.shipping_address.zipcode,
              phone: updatedAddress.data.shipping_address.phone,
              infoPage: !this.state.infoPage ,
              updatePage: !this.state.updatePage
            })
          })
      })
  }

  openUpdateUserInfoBox(){
    this.setState({
      infoPage: !this.state.infoPage ,
      updatePage: !this.state.updatePage
    })
  }

  openOrderHistory(){
    this.setState({
      infoPage: !this.state.infoPage ,
      orderHistory: !this.state.orderHistory
    })
  }

  goBackToMemberProfile(){
    this.setState({
      infoPage: true,
      orderHistory: false,
      updatePage: false
    })
  }

  closeProfileUpdateBox(){
    document.querySelector(".memberProfileBlock").classList.toggle("hide")
  }

  render(){
    if(!this.state.memberInfo && !this.state.purchases){
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

        <div className={
          (this.state.infoPage === true)?
            "memberProfile":
            "memberProfile hide"
         }>
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
          <button onClick={this.openOrderHistory.bind(this)}>Order History</button>
        </div>
        <div className={
          (this.state.updatePage === true)?
            "updateUserInfoBox":
            "updateUserInfoBox hide"
        }>
          <UpdateUserInfoBox
            memberAddressChange = {this.memberAddressChange.bind(this)}
            updateSubmit = {this.updateSubmit.bind(this)}
            goBackToMemberProfile = {this.goBackToMemberProfile.bind(this)}
            />
        </div>

        <div className={
          (this.state.orderHistory === true)?
            "orderHistoryBox":
            "orderHistory hide"
        }>
          <OrderHistory
            purchases = {this.state.purchases}
            goBackToMemberProfile = {this.goBackToMemberProfile.bind(this)}
            />
        </div>
      </div>
    )
  }
}

export default MemeberProfile;
