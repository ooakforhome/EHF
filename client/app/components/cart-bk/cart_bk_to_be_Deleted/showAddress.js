import React, { Component } from 'react';
import cart from './cart-helper';
import UpdateAddress from './updateAddress';

import axios from 'axios';

class ShowAddress extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: "",
      user: "",
      address: "",
    }
  }

  componentWillMount(){
    this.getUserAddress();
  }

  getUserAddress(){
    cart.userId(newid => {
      // console.log(newid.data)
      axios.get(`/api/user/finduseraddress?userID=${newid.data}`)
        .then((nAddress, err) => {
          // console.log("=============nAddress=================");
          // console.log(nAddress.data.address.address1);
          // console.log(nAddress.data.address);
          // console.log("==========end===nAddress===end==============");
          if(err){console.log("err : " + err)}
          this.setState({
            email: nAddress.data.email,
            user: nAddress.data.username,
            address: nAddress.data.address,
          })
      })
    })
  }

  triggerUpdate(){
    document.querySelector('.show_address_container').classList.toggle("hide");
    document.querySelector('.update_address_btn').classList.toggle("hide");
    document.querySelector('.update_address_box').classList.toggle("hide");
    document.querySelector('.change_address_btn').classList.toggle("hide");
  }

  render(){
    // if(this.state.address[0] === null){
    //   return "wait"
    // }
    // console.log(this.state.address.address1)

const { user, email } = this.state
const { recipient_name, country, address1="", address2="", city, state, zipcode, phone } = this.state.address

      return(
        <>
        <div className="address_container">
          <div className="show_address_container">
            <h2>SHIPPING ADDRESS</h2>
            <p><b>Customer Name: </b>{user}</p>
            <p><b>Customer E-Mail: </b>{email}</p>

            <h2>ADDRESS</h2>
            <p><b>Recipient Name: </b>{recipient_name}</p>
            <p><b>Address 1: </b>{address1}</p>
            <p><b>Address 2: </b>{address2}</p>
            <p><b>City: </b>{city}</p>
            <p><b>State: </b>{state}</p>
            <p><b>Zip Code: </b>{zipcode}</p>
            <p><b>Country: </b>{country}</p>
            <p><b>Phone: </b>{phone}</p>
          </div>
          <div className="update_address_box hide">
            <UpdateAddress />
          </div>
          <button className="update_address_btn" onClick={this.triggerUpdate.bind(this)}>UPDATE</button>
        </div>
        </>
      )
    }
  }


export default ShowAddress;
