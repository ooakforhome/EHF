import React, { Component } from 'react';
import cart from '../cart-helper';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// import parts
import PaypalButton from './PaypalButton.js';
import Creds from './cred';

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';


class PaypalCheckout extends Component{
  constructor(props){
    super(props);
    this.state = {
      orderID: this.props.match.params.id,
      token: JSON.parse(localStorage.the_main_app).token
    }
  }

  componentWillMount(){
    this.loadOrderById()
  }

  loadOrderById(){
    const {orderID} = this.state;

    axios.get(`/api/placeorder?orderid=${orderID}`)
      .then(res => {

        let grandTotal = 0;
        res.data.products.forEach(product => {
          return grandTotal += (product.purchase_price * product.quantity)
        })

        this.setState({
          products: res.data.products,
          grandTotal: grandTotal,
          address: res.data.shipping_address
        })
    })
  }

  render(){
    if(!this.state.address){
      return "wait a min"
    }
    let SubTotal = this.state.grandTotal;
    const Total = parseFloat((SubTotal*1.07).toFixed(2));
    const tax = 0.07;
    let Items = [];
      (!this.state.products)?
        '':
        this.state.products.forEach(item => Items.push({
        name: item.product_name,
        description: item.product_name,
        quantity: item.quantity,
        price: item.purchase_price,
        tax: parseFloat((item.purchase_price*tax).toFixed(2)),
        currency: "USD",
      })
    );
    let Details = {
      subtotal: parseFloat(`${SubTotal}`),
      tax: parseFloat((SubTotal*.07).toFixed(2)),
      shipping: 0,
    }

    const { address1,address2,city,phone,recipient_name,state,zipcode } = this.state.address;
    let TheAddress = {
      recipient_name: recipient_name,
      line1: address1,
      line2: address2,
      city: city,
      state: state,
      postal_code: zipcode,
      country_code: 'US',
      phone: phone
    };



  // --> validation
    const onSuccess = (payment) => {
      cart.userId( id => {
        axios.put("/api/user/paymentsuccessful/", {
          _id: id.data,
          orderid: this.state.orderID,
          paymentid: payment.paymentID
        })
        .then(info => {
          alert("your payment is successful");
          window.location = `/receipt/${this.state.orderID}`
        })
      })
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
          client={Creds}
          env={ENV}
          commit={true}
          currency={'USD'}
          total={Total}
          items={Items}
          details= {Details}
          shipping_address = {TheAddress}
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
