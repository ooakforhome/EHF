import React, { Component } from 'react';
import cart from '../cart-helper';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// import parts
import PaypalButton from './PaypalButton.js';


const CLIENT = {
  sandbox: 'AeK8ZZ1wQQvzSlZBRhS0mjHSz5JOguwuR8wi7yleu4byGxwuhZw86Xjow7iyz2TWJ_9Yz3dl0W2uMg4k',
  production: 'AeK8ZZ1wQQvzSlZBRhS0mjHSz5JOguwuR8wi7yleu4byGxwuhZw86Xjow7iyz2TWJ_9Yz3dl0W2uMg4k'
}

// const CLIENT = {
//   sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
//   production: process.env.PAYPAL_CLIENT_ID_PRODUCTION
// }
// const ENV = process.env.NODE_ENV === 'production'
//   ? 'production'
//   : 'sandbox';


class PaypalCheckout extends Component{

componentWillMount(){
  this.loadStorageinfo();
  this.setState({
    orderID: this.props.match.params.id
  })
}

loadStorageinfo(){
  this.setState({
    products: cart.getCart()
  })
}


  render(){

    if(this.state.products.length <= 0){
      alert("Your cart is empty!")
      // this.props.history.push("/")
      window.location = "/";
    }

  let SubTotal = (!localStorage.cart)?0:JSON.parse(localStorage.cart)
    .map(item=>{ return item.retail* item.quantity})
      .reduce((acc, curr)=>{
        return acc+curr
        }, 0);

    const Total = parseFloat((SubTotal*1.07).toFixed(2));
    const tax = 0.07;
    let Items = [];
      (!localStorage.cart)?'':JSON.parse(localStorage.cart).forEach(item => Items.push({
        name: item.product.Product_Name,
        description: item.product.Product_Name,
        quantity: item.quantity,
        price: item.retail,
        sku: item.product.SKU,
        tax: parseFloat((item.retail*tax).toFixed(2)),
        currency: "USD",
      })
    );
    let Details = {
      subtotal: parseFloat(`${SubTotal}`),
      tax: parseFloat((SubTotal*.07).toFixed(2)),
      shipping: 0,
    }

    const shipAddress = (!localStorage.shipping_address)?'':JSON.parse(localStorage.shipping_address)[0];
    let ShipAddress = [];
    (!localStorage.shipping_address)?'':JSON.parse(localStorage.shipping_address).forEach(item => ShipAddress.push({
        recipient_name: shipAddress.recipient_name,
        line1: shipAddress.line1,
        line2: (!shipAddress.line2)?"":shipAddress.line2,
        city: shipAddress.city,
        state: shipAddress.state,
        postal_code: shipAddress.postal_code,
        country_code: 'US',
        phone: shipAddress.phone,
      })
    )
    console.log(ShipAddress[0])
    const onSuccess = (payment) => {
        alert("your payment is successful");
        window.location = `/receipt/${this.state.orderID}`
    }

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return(
      <>
        <div id="cart_container" className="s-iCol-12 col-6">
          <div>
            <p className="fLeft">TOTAL</p>
            <h3 className="fLeft">$<b id="totalamount">{SubTotal}</b></h3>
          </div>
        </div>
        <div className="s-iCol-12 col-6">
          <PaypalButton
            client={CLIENT}
            env={'sandbox'}
            commit={true}
            currency={'USD'}
            total={Total}
            items={Items}
            details= {Details}
            shipping_address = {ShipAddress[0]}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onCancel}
          />
        </div>
      </>
    )
  }
}

export default PaypalCheckout;
