import React, { Component } from 'react';
// import cart from './cart-helper';

class GuessAddress extends Component {


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
      address.push({
        customer_name: this.state.customer_name,
        customer_email: this.state.customer_email,
        recipient_name: this.state.recipient_name,
        line1: this.state.address1,
        line2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        postal_code: this.state.zipcode,
        country_code: "USA",
        phone: this.state.phone,
      })
      localStorage.setItem('shipping_address', JSON.stringify(address))
    }
}


  render(){
    return(
      <>
        <div>
          <h2>GUESS ADDRESS</h2>
        </div>
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
            <label htmlFor="address_1"><i className="">STREET</i></label>
            <input
              type="text"
              id="address_1"
              name="address1"
              placeholder="123 test dr"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="address_2"><i className="">STREET</i></label>
            <input
              type="text"
              id="address_2"
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
            <label htmlFor="phone_number"><i className="">Phone #</i></label>
            <input
              type="text"
              id="phone_number"
              name="phone"
              placeholder="123-456-7890"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <button onClick={this.formSubmit.bind(this)}>SUBMIT</button>
      </>
    )
  }

}// end class component

export default GuessAddress;
