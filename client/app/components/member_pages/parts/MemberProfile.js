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
      updatePage: false,
      token: JSON.parse(localStorage.the_main_app).token
    }

  }

  componentWillMount(){
    this.loadMemberInfo()
  }

  loadMemberInfo(){
    // const { shipping_address, username, recipient_name, address1, address2, city, state, zipcode, country, phone } = member.data.shipping_address;

    API.userLimitedInfo(this.state.token)
      .then( member => {
        this.setState({
          purchases: member.data.order_history,
          memberInfo: member.data,
          memberAddress: member.data.shipping_address,
          username: member.data.username,
          recipient_name: member.data.recipient_name,
          address1: member.data.address1,
          address2: member.data.address2,
          city: member.data.city,
          state: member.data.state,
          zipcode: member.data.zipcode,
          country: member.data.country,
          phone: member.data.phone
        })
      })
  }

  memberAddressChange(e){
    let key = e.target.getAttribute('data-name');
    let keyvalue = e.target.value;
    this.setState(prevState =>({
      ...prevState,
      memberAddress: {
        ...prevState.memberAddress,
        [key]: keyvalue
      }
    }))
  }


// REDO THIS PART, add callback after setState
  updateSubmit(e){
    e.preventDefault();
    API.loadUserIdByToken(this.state.token)
      .then(info => {
        API.updateUserInfo( info.data , {
          shipping_address : {
            recipient_name : this.state.memberAddress.recipient_name,
            address1 : this.state.memberAddress.address1,
            address2 : this.state.memberAddress.address2,
            city : this.state.memberAddress.city,
            state : this.state.memberAddress.state,
            zipcode : this.state.memberAddress.zipcode,
            country : "USA",
            phone : this.state.memberAddress.phone
            }
          })
          // .then( updatedAddress => {
          //   this.setState({
          //     memberInfo: updatedAddress.data,
          //     memberAddress: updatedAddress.data.shipping_address,
          //     recipient_name: updatedAddress.data.shipping_address.recipient_name,
          //     address1: updatedAddress.data.shipping_address.address1,
          //     address2: updatedAddress.data.shipping_address.address2,
          //     city: updatedAddress.data.shipping_address.city,
          //     state: updatedAddress.data.shipping_address.state,
          //     zipcode: updatedAddress.data.shipping_address.zipcode,
          //     phone: updatedAddress.data.shipping_address.phone,
          //     infoPage: !this.state.infoPage ,
          //     updatePage: !this.state.updatePage
          //   })
          // })
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
    
    if(!this.state.memberAddress && !this.state.purchases){
      console.log("wait")
    }
    // console.log("------MemberProfile.js-----------")
    // console.log(this.state.memberAddress)

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
            {...this.state.memberAddress}
            username = {this.state.memberInfo.username}
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
