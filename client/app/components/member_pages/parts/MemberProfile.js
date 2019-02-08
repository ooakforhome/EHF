import React, { Component } from 'react';
import API from '../api_helper';

import UpdateUserInfoBox from './MemberProfileParts/UpdateUserInfoBox';
// import OrderHistory from './MemberProfileParts/OrderHistory';

class MemeberProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
      memberInfo: {},
      memberAddress: {},
      purchases: [],
      infoPage: true,
      updatePage: false
    }
  }

  componentWillMount(){
    console.log("render componentWillMount")
    this.loadMemberInfo()
    this.setState({
      purchases: [
        {date: "123"},
        {date: "223"},
        {date: "323"},
        {date: "423"},
        {date: "523"},
        {date: "623"}
      ]
    })
  }

  componentDidMount(){
    console.log("render componentDidMount")
  }

  loadMemberInfo(){
    API.loadUserByToken(JSON.parse(localStorage.the_main_app).token)
      .then( member => {
        this.setState({
          memberInfo: member.data,
          memberAddress: member.data.shipping_address,
          username: member.data.shipping_address.username,
          recipient_name: member.data.shipping_address.recipient_name,
          address1: member.data.shipping_address.address1,
          address2: member.data.shipping_address.address2,
          city: member.data.shipping_address.city,
          state: member.data.shipping_address.state,
          zipcode: member.data.shipping_address.zipcode,
          country: member.data.shipping_address.country,
          phone: member.data.shipping_address.phone,
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

  closeProfileUpdateBox(){
    document.querySelector(".memberProfileBlock").classList.toggle("hide")
  }

  showPurchaseDetail(){
    console.log("info")
  }

  render(){
    if(!this.state.memberInfo){
      console.log("wait")
    }

    console.log(this.state.purchases)

    const PurchaseHistory = ({purchases}) => (
      <ul>
      { purchases.map((purchase, i) =>{
          <li key={i} onClick={this.state.showPurchaseDetail}>
            {purchase.date}
          </li>
        })
      }
      </ul>
    )


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
        </div>
        <div className={
          (this.state.updatePage === true)?
            "updateUserInfoBox":
            "updateUserInfoBox hide"
        }>
          <UpdateUserInfoBox
            memberAddressChange = {this.memberAddressChange.bind(this)}
            updateSubmit = {this.updateSubmit.bind(this)}
            />
        </div>

        <div>
          {(this.state.purchases)?
            <PurchaseHistory purchases={this.state.purchases}/>:""}
        </div>
      </div>
    )
  }
}

export default MemeberProfile;
