import React from 'react';
import Update_Address from './update_address';

const Show_Address = ({ user, email, recipient_name, address1, address2, city, state, zipcode, phone, triggerUpdate, addressChange, formUpdate }) => (
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
      <p><b>Phone: </b>{phone}</p>
    </div>
    <div className="update_address_box hide">
      <Update_Address
      addressChange = { addressChange }
      formUpdate = { formUpdate }
      />
    </div>
    <button className="update_address_btn" onClick={triggerUpdate}>UPDATE</button>
  </div>
)

export default Show_Address;
