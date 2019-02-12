import React, { Component } from 'react';
import cart from './cart-helper';
import axios from "axios";

class Update_Address extends Component {
  constructor(props){
    super(props);
      this.state={
        recipient_name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
        phone: "",
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
          if(err){console.log("err : " + err)}
          // console.log(nAddress.data)
          this.setState({
            recipient_name: nAddress.data.address.recipient_name,
            address1: nAddress.data.address.address1,
            address2: nAddress.data.address.address2,
            city: nAddress.data.address.city,
            state: nAddress.data.address.state,
            zipcode: nAddress.data.address.zipcode,
            phone: nAddress.data.address.phone
          })
      })
    })
  }

  render(){
    return(
      <>
        <div className="update_address_container">
          <h3>UPDATE ADDRESS</h3>
        </div>
        <form onSubmit={this.props.formUpdate}>
          <div>
            <label htmlFor="street"><i className="">Recipient Name</i></label>
            <input
              type="text"
              id="street"
              name="recipient_name"
              placeholder={this.state.recipient_name}
              onChange={this.props.addressUpdateChange}/>
          </div>
          <div>
            <label htmlFor="address_1"><i className="">STREET</i></label>
            <input
              type="text"
              id="address_1"
              name="address1"
              placeholder={this.state.address1}
              onChange={this.props.addressUpdateChange}/>
          </div>
          <div>
            <label htmlFor="address_2"><i className="">STREET</i></label>
            <input
              type="text"
              id="address_2"
              name="address2"
              placeholder={this.state.address2}
              onChange={this.props.addressUpdateChange}/>
          </div>
          <div>
            <label htmlFor="city"><i className="">CITY</i></label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder={this.state.city}
              onChange={this.props.addressUpdateChange}/>
          </div>
          <div>
            <label htmlFor="state"><i className="">STATE</i></label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder={this.state.state}
              onChange={this.props.addressUpdateChange}/>
          </div>
          <div>
            <label htmlFor="zip"><i className="">ZIP CODE</i></label>
            <input
              type="text"
              id="zip"
              name="zipcode"
              placeholder={this.state.zipcode}
              onChange={this.props.addressUpdateChange}/>
          </div>
          <div>
            <label htmlFor="phone_number"><i className="">Phone #</i></label>
            <input
              type="text"
              id="phone_number"
              name="phone"
              placeholder={this.state.phone}
              onChange={this.props.addressUpdateChange}/>
          </div>
          <button className="change_address_btn hide" type="submit">SUBMIT</button>
        </form>
      </>
    )
  }

}// end class component

export default Update_Address;
