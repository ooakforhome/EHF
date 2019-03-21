import React, { Component } from 'react';
import UpdateAddress from './UpdateAddress';

class ShowAddress extends Component{
  constructor(props){
    super(props)
    this.state={
        address: {
          recipient_name:"",
          address1:"",
          address2:"",
          city:"",
          state:"",
          zipcode:"",
          phone:""
        },
        updateActive: false
    }
  }

  componentDidMount(){
      const newAddress = (localStorage.shipping_address)?JSON.parse(localStorage.shipping_address):{};

      this.setState({
        address: newAddress
      })
  }

  updateActiveChange(){
    this.setState({
      updateActive: !this.state.updateActive
    })
  }

  addressChange(e){
    let dataName = e.target.getAttribute("data-name");
    let value = e.target.value.trim();

    this.setState(preveState=>({
      ...preveState,
      address: {
        ...preveState.address,
        [dataName]: value
      }
    }))
  }

  formSubmit(e){
    e.preventDefault();
    let { address } = this.state;
    if (typeof window !== "undefined") {
      if (localStorage.getItem('shipping_address')) {
        localStorage.removeItem('shipping_address')
      }
      localStorage.setItem('shipping_address', JSON.stringify(address))
      this.setState({
        updateActive: !this.state.updateActive
      })
    }
  }

  render(){
    if(!this.state.address){
      return(
        <>
          <h2>NO ADDRESS</h2>
        </>
      )
    } else {
      const { city, country_code, customer_email, customer_name, line1, line2, phone, postal_code, recipient_name, state } = this.state.address
      return(
        <>
          <div className="address_container">
            <div className={this.state.updateActive? "hide":"show_address_container"}>
              <h2>SHIPPING ADDRESS</h2>
              <p><b>Recipient Name: </b>{recipient_name}</p>
              <p><b>Address 1: </b>{line1}</p>
              <p><b>Address 2: </b>{line2}</p>
              <p><b>City: </b>{city}</p>
              <p><b>State: </b>{state}</p>
              <p><b>Zip Code: </b>{postal_code}</p>
              <p><b>Country: </b>{country_code}</p>
              <p><b>Phone: </b>{phone}</p>
            </div>
            <button onClick={this.updateActiveChange.bind(this)}>Update Address</button>
              <span className={this.state.updateActive? "": "hide"}>
                <UpdateAddress
                  address = {this.state.address}
                  addressChange = {this.addressChange.bind(this)}
                  formSubmit = {this.formSubmit.bind(this)}
                />
              </span>
          </div>
        </>
      )
      }//else
    }
  }


export default ShowAddress;


// <div className="address_container">
//   <div className="show_address_container">
//     <h2>SHIPPING ADDRESS</h2>
//     <p><b>Recipient Name: </b>{recipient_name}</p>
//     <p><b>Address 1: </b>{line1}</p>
//     <p><b>Address 2: </b>{line2}</p>
//     <p><b>City: </b>{city}</p>
//     <p><b>State: </b>{state}</p>
//     <p><b>Zip Code: </b>{postal_code}</p>
//     <p><b>Country: </b>{country_code}</p>
//     <p><b>Phone: </b>{phone}</p>
//   </div>
//   <button onClick={this.updateActiveChange.bind(this)}>Update Address</button>
//     <span className={this.state.updateActive? "": "hide"}>
//       <UpdateAddress />
//     </span>
// </div>
