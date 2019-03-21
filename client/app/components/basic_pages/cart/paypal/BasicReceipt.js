import React, { Component } from "react";
// import axios from 'axios';
import cart from './cart-helper'

class PurchaseReceipt extends Component {
  constructor(props){
    super(props);
    this.state = {
      confirmNum: JSON.parse(localStorage.paid).paymentID,
      orderID: this.props.match.params.id
    }
  }


endPurchase(){
  const local = ["cart", "paid", "shipping_address", "__paypal_storage__"]
  local.forEach(storage => {
    localStorage.removeItem(storage);
  })
      window.location= `/`;
}

render(){
  const reqId = this.state.orderID;
  const reqPayStatus = "Successful";
  const reqPayID = JSON.parse(localStorage.paid).paymentID;
  axios.put(`/api/placeorder`, {_id: reqId},
    {
    payment_status: reqPayStatus,
    payment_id: reqPayID
  })

  return(
    <>
      <p>YOUR CONFIRMATION NUMBER IS : <b>{this.state.orderID}</b></p>
      <button onClick={this.endPurchase.bind(this)}>CLOSE</button>
    </>
  )
}


} // end class

export default PurchaseReceipt;
