import React from 'react';
import Update_Address from './update_address';

const Show_Address = (props) => {
  return(
  <div className="address_container">
    <div className={(props.showTaggle)?"show_address_container": "show_address_container hide"}>
      <h2>SHIPPING INFO</h2>
      <div><b>Customer Name: </b>{ props.user }</div>
      <div><b>Customer E-Mail: </b>{ props.email }</div>

      <h3>ADDRESS</h3>
      <div><b>Recipient Name: </b>{ props.recipient_name }</div>
      <div><b>Address 1: </b>{ props.address1 }</div>
      <div><b>Address 2: </b>{ props.address2 }</div>
      <div><b>City: </b>{ props.city }</div>
      <div><b>State: </b>{ props.state }</div>
      <div><b>Zip Code: </b>{ props.zipcode }</div>
      <div><b>Phone: </b>{ props.phone }</div>
    </div>
  </div>
)
}

export default Show_Address;
