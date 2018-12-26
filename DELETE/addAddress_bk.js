import React, { Component } from 'react';
// import cart from './cart-helper';
import axios from "axios";

class AddAddress extends Component {


addressChange(e){
  e.preventDefault();
  this.setState({
    [e.target.name]: e.target.value.trim()
  })
}

formSubmit(){
  let address = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem('shipping_address')) {
        localStorage.removeItem('shipping_address')
      }

      const lsUser = JSON.parse(localStorage.the_main_app).token;
      const lsCart = [];
      JSON.parse(localStorage.cart).forEach(cartData=>{
        lsCart.push({
          product: cartData.product._id,
          quantity: cartData.quantity,
          retail: cartData.retail,
        })
      });

      const lsShipAddress = [];
        lsShipAddress.push({
          recipient_name: this.state.recipient_name,
          address1: this.state.address1,
          address2: this.state.address2,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          country: this.state.country,
          phone: this.state.phone,
        });

      address.push({
        customer_name: this.state.customer_name,
        customer_email: this.state.customer_email,
        recipient_name: this.state.recipient_name,
        line1: this.state.address1,
        line2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        postal_code: this.state.zipcode,
        country_code: this.state.country,
        phone: this.state.phone,
      })
      localStorage.setItem('shipping_address', JSON.stringify(address));
      axios.post('/api/placeorder', {
          products: lsCart,
          customer_name: this.state.customer_name,
          customer_email: this.state.customer_email,
          shipping_address: lsShipAddress[0],
          user: lsUser
          })
            .then(data=>{
              console.log("---------api placeholder----------")
              console.log(data)
            });
    }
}

  render(){
    return(
      <>
        <div>
          <h2>ADD ADDRESS</h2>
        </div>
        <form onSubmit={this.formSubmit.bind(this)}>
          <div>
            <label htmlFor="name"><i className="">NAME</i></label>
            <input
              type="text"
              id="name"
              name="customer_name"
              placeholder="exp. Don Jovi"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="email"><i className="">Email</i></label>
            <input
              type="text"
              id="email"
              name="customer_email"
              placeholder="john@example.com"
              onChange={this.addressChange.bind(this)}/>
          </div>

          <p>ADDRESS</p>
          <div>
            <label htmlFor="street"><i className="">Recipient Name</i></label>
            <input
              type="text"
              id="street"
              name="recipient_name"
              placeholder="testName"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="street"><i className="">STREET</i></label>
            <input
              type="text"
              id="street"
              name="address1"
              placeholder="123 test dr"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="street"><i className="">STREET</i></label>
            <input
              type="text"
              id="street"
              name="address2"
              placeholder="apt 1"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="city"><i className="">CITY</i></label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="ATL"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="state"><i className="">STATE</i></label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="GA"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="zip"><i className="">ZIP CODE</i></label>
            <input
              type="text"
              id="zip"
              name="zipcode"
              placeholder="30340"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="country"><i className="">COUNTRY</i></label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="US"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="country"><i className="">Phone #</i></label>
            <input
              type="text"
              id="country"
              name="phone"
              placeholder="123-456-7890"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <button type="submit" >SUBMIT</button>
        </form>
      </>
    )
  }

}// end class component

export default AddAddress;
