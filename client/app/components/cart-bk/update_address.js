import React from "react";

const Update_Address = ({addressChange, formUpdate}) => (
  <div className="update_address_container">
    <h2>UPDATE ADDRESS</h2>
      <div>
        <label><i>Recipient Name: </i></label>
        <input
          type="text"
          id="input_recipient_name"
          name="recipient_name"
          placeholder="recipient_name"
          onChange={addressChange}
          />
      </div>
      <div>
        <label><i>Address: </i></label>
        <input
          type="text"
          id="input_address1"
          name="address1"
          placeholder="address1"
          onChange={addressChange}
          />
      </div>
      <div>
        <label><i>Address 2: </i></label>
        <input
          type="text"
          id="input_address2"
          name="address2"
          placeholder="address2"
          onChange={addressChange}
          />
      </div>
      <div>
        <label><i>City: </i></label>
        <input
          type="text"
          id="input_city"
          name="city"
          placeholder="city"
          onChange={addressChange}
          />
      </div>
      <div>
        <label><i>State: </i></label>
        <input
          type="text"
          id="input_state"
          name="state"
          placeholder="state"
          onChange={addressChange}
          />
      </div>
      <div>
        <label><i>Zip Code: </i></label>
        <input
          type="text"
          id="input_zipcode"
          name="zipcode"
          placeholder="zipcode"
          onChange={addressChange}
          />
      </div>
      <div>
        <label><i>Phone: </i></label>
        <input
          type="text"
          id="input_phone"
          name="phone"
          placeholder="phone"
          onChange={addressChange}
          />
      </div>
      <button className="change_address_btn hide" onClick={formUpdate}>Submit</button>
  </div>
)

export default Update_Address
