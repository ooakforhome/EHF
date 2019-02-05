import React, { Component } from 'react';

import UpdateAddress from './updateAddress';

class ShowAddress extends Component{

  componentWillMount(){
    this.setState({
      address: JSON.parse(localStorage.shipping_address)[0]
    })
  }

triggerUpdate(){
  document.querySelector('.show_address_container').classList.toggle("hide");
  document.querySelector('.update_address_btn').classList.toggle("hide");
  document.querySelector('.update_address_box').classList.toggle("hide");
  document.querySelector('.change_address_btn').classList.toggle("hide");
}

  render(){
    const { city, country_code, customer_email, customer_name, line1, line2, phone, postal_code, recipient_name, state } = this.state.address
      return(
        <>
          <div className="address_container">
            <div className="show_address_container">
              <h2>SHIPPING ADDRESS</h2>
              <p><b>Customer Name: </b>{customer_name}</p>
              <p><b>Customer E-Mail: </b>{customer_email}</p>

              <h2>ADDRESS</h2>
              <p><b>Recipient Name: </b>{recipient_name}</p>
              <p><b>Address 1: </b>{line1}</p>
              <p><b>Address 2: </b>{line2}</p>
              <p><b>City: </b>{city}</p>
              <p><b>State: </b>{state}</p>
              <p><b>Zip Code: </b>{postal_code}</p>
              <p><b>Country: </b>{country_code}</p>
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
