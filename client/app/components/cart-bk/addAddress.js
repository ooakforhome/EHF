import React, { Component } from "react";
import axios from "axios";
import cart from "./cart-helper";

class AddAddress extends Component {
  constructor(){
    super();
    this.state={
      recipient_name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
    }
  }

  componentDidMount(){
    this.getUserAddress();
  }

  getUserAddress(){
    cart.userId( id => {
      axios.get(`/api/user/finduseraddress?userID=${id.data}`)
        .then( getAddress =>{
          const gA = getAddress.data;
          this.setState({
            username: gA.username,
            recipient_name: gA.address.recipient_name,
            address1: gA.address.address1,
            address2: gA.address.address2,
            city: gA.address.city,
            state: gA.address.state,
            zipcode: gA.address.zipcode,
            phone: gA.address.phone,
          })
        })
    })
  }

  addressChange(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value.trim()
    })
  }

  formSubmit(){
    cart.userId(id=>{
      axios.post(`/api/user/userupdate?_id=${id.data}`, {
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
    })
  }

  render(){
    return(
      <>
        <h2>ADD ADDRESS</h2>
        <form onClick={this.formSubmit.bind(this)}>
          <p>ADDRESS</p>
          <div>
            <label><i>Recipient Name: </i></label>
            <input
              type="text"
              id="input_recipient_name"
              name="recipient_name"
              placeholder={this.state.recipient_name}
              onChange={this.addressChange.bind(this)}
              />
          </div>
          <div>
            <label><i>Address: </i></label>
            <input
              type="text"
              id="input_address1"
              name="address1"
              placeholder={this.state.address1}
              onChange={this.addressChange.bind(this)}
              />
          </div>
          <div>
            <label><i>Address 2: </i></label>
            <input
              type="text"
              id="input_address2"
              name="address2"
              placeholder={this.state.address2}
              onChange={this.addressChange.bind(this)}
              />
          </div>
          <div>
            <label><i>City: </i></label>
            <input
              type="text"
              id="input_city"
              name="city"
              placeholder={this.state.city}
              onChange={this.addressChange.bind(this)}
              />
          </div>
          <div>
            <label><i>State: </i></label>
            <input
              type="text"
              id="input_state"
              name="state"
              placeholder={this.state.state}
              onChange={this.addressChange.bind(this)}
              />
          </div>
          <div>
            <label><i>Zip Code: </i></label>
            <input
              type="text"
              id="input_zipcode"
              name="zipcode"
              placeholder={this.state.zipcode}
              onChange={this.addressChange.bind(this)}
              />
          </div>
          <div>
            <label><i>Phone: </i></label>
            <input
              type="text"
              id="input_phone"
              name="phone"
              placeholder={this.state.phone}
              onChange={this.addressChange.bind(this)}
              />
          </div>
          <button type="submit">Submit</button>
        </form>
      </>
    )
  }
}// end class component

export default AddAddress
