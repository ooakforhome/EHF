import React, { Component } from "react";
// import axios from 'axios';
import cart from './cart-helper'

class PurchaseReceipt extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderID: this.props.match.params.id
    }
  }


endPurchase(){
  cart.userId( id => {
    cart.emptyCart(id.data, (info)=>{
      window.location= `/auth/products`;
    })
  })
}

render(){

  return(
    <>
      <p>YOUR CONFIRMATION NUMBER IS : <b>{this.state.orderID}</b></p>
      <button onClick={this.endPurchase.bind(this)}>CLOSE</button>
    </>
  )
}


} // end class

export default PurchaseReceipt;
