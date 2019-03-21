import React, { Component } from 'react';
// import cart from './cart-helper';

class UpdateAddress extends Component {
  constructor(props){
    super(props);
      this.state={
        address: this.props.address
      }
  }

// addressChange(e){
//   let dataName = e.target.getAttribute("data-name");
//   let value = e.target.value.trim();
//
//   this.setState(preveState=>({
//     ...preveState,
//     address: {
//       ...preveState.address,
//       [dataName]: value
//     }
//   }))
// }
//
// formSubmit(){
//   let { address } = this.state;
//     if (typeof window !== "undefined") {
//       if (localStorage.getItem('shipping_address')) {
//         localStorage.removeItem('shipping_address')
//       }
//       localStorage.setItem('shipping_address', JSON.stringify(address))
//     }
// }


  render(){
    return(
      <>
        <div className="update_address_container">
          <h2>UPDATE ADDRESS</h2>
        </div>
          <div>
            <label><i className="">Recipient Name</i></label>
            <input
              type="text"
              id="street"
              data-name="recipient_name"
              placeholder={this.state.recipient_name}
              onChange={this.props.addressChange}/>
          </div>
          <div>
            <label><i className="">STREET</i></label>
            <input
              type="text"
              id="address_1"
              data-name="address1"
              placeholder={this.state.address1}
              onChange={this.props.addressChange}/>
          </div>
          <div>
            <label><i className="">STREET</i></label>
            <input
              type="text"
              id="address_2"
              data-name="address2"
              placeholder={this.state.address2}
              onChange={this.props.addressChange}/>
          </div>
          <div>
            <label><i className="">CITY</i></label>
            <input
              type="text"
              id="city"
              data-name="city"
              placeholder={this.state.city}
              onChange={this.props.addressChange}/>
          </div>
          <div>
            <label><i className="">STATE</i></label>
            <input
              type="text"
              id="state"
              data-name="state"
              placeholder={this.state.state}
              onChange={this.props.addressChange}/>
          </div>
          <div>
            <label><i className="">ZIP CODE</i></label>
            <input
              type="text"
              id="zip"
              data-name="zipcode"
              placeholder={this.state.zipcode}
              onChange={this.props.addressChange}/>
          </div>
          <div>
            <label><i className="">Phone #</i></label>
            <input
              type="text"
              id="phone_number"
              data-name="phone"
              placeholder={this.state.phone}
              onChange={this.props.addressChange}/>
          </div>
          <button onClick={this.props.formSubmit} className="change_address_btn">SUBMIT</button>
      </>
    )
  }

}// end class component

export default UpdateAddress;
