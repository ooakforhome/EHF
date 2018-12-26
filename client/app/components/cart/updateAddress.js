import React, { Component } from 'react';
// import cart from './cart-helper';

class UpdateAddress extends Component {
  constructor(props){
    super(props);
      this.state={
        customer_name: JSON.parse(localStorage.shipping_address)[0].customer_name,
        customer_email: JSON.parse(localStorage.shipping_address)[0].customer_email,
        recipient_name: JSON.parse(localStorage.shipping_address)[0].recipient_name,
        address1: JSON.parse(localStorage.shipping_address)[0].line1,
        address2: JSON.parse(localStorage.shipping_address)[0].line2,
        city: JSON.parse(localStorage.shipping_address)[0].city,
        state: JSON.parse(localStorage.shipping_address)[0].state,
        zipcode: JSON.parse(localStorage.shipping_address)[0].postal_code,
        phone: JSON.parse(localStorage.shipping_address)[0].phone,
      }
  }

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
        <div className="update_address_container">
          <h2>UPDATE ADDRESS</h2>
        </div>
        <form onSubmit={this.formSubmit.bind(this)}>
          <div>
            <label htmlFor="name"><i className="">NAME</i></label>
            <input
              type="text"
              id="name"
              name="customer_name"
              placeholder={this.state.customer_name}
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="email"><i className="">Email</i></label>
            <input
              type="text"
              id="email"
              name="customer_email"
              placeholder={this.state.customer_email}
              onChange={this.addressChange.bind(this)}/>
          </div>

          <p>ADDRESS</p>
          <div>
            <label htmlFor="street"><i className="">Recipient Name</i></label>
            <input
              type="text"
              id="street"
              name="recipient_name"
              placeholder={this.state.recipient_name}
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="address_1"><i className="">STREET</i></label>
            <input
              type="text"
              id="address_1"
              name="address1"
              placeholder={this.state.address1}
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="address_2"><i className="">STREET</i></label>
            <input
              type="text"
              id="address_2"
              name="address2"
              placeholder={this.state.address2}
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="city"><i className="">CITY</i></label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder={this.state.city}
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="state"><i className="">STATE</i></label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder={this.state.state}
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="zip"><i className="">ZIP CODE</i></label>
            <input
              type="text"
              id="zip"
              name="zipcode"
              placeholder={this.state.zipcode}
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="phone_number"><i className="">Phone #</i></label>
            <input
              type="text"
              id="phone_number"
              name="phone"
              placeholder={this.state.phone}
              onChange={this.addressChange.bind(this)}/>
          </div>
          <button className="change_address_btn hide" type="submit">SUBMIT</button>
        </form>
      </>
    )
  }

}// end class component

export default UpdateAddress;
