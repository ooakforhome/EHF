import React, { Component } from 'react';
import AddProduct from './parts/add_product';
import cart from './cart-helper';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// import parts
import Checkout from './checkout';
import PaypalButton from './paypal/PaypalButton.js';


const CLIENT = {
  sandbox: 'AeK8ZZ1wQQvzSlZBRhS0mjHSz5JOguwuR8wi7yleu4byGxwuhZw86Xjow7iyz2TWJ_9Yz3dl0W2uMg4k',
  production: 'AeK8ZZ1wQQvzSlZBRhS0mjHSz5JOguwuR8wi7yleu4byGxwuhZw86Xjow7iyz2TWJ_9Yz3dl0W2uMg4k'
}


class CartPage extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     products: localStorage.setItem('cart', '')
  //   }
  // }

componentWillMount(){
  this.loadStorageinfo();
}

loadStorageinfo(){
  this.setState({
    products: cart.getCart()
  })
}


removeInCart(e){
  const theOne = e.target.name
  cart.removeItem(theOne);
      this.loadStorageinfo();
}

qtyChangeHandler(e){
  e.preventDefault()
  let num = parseInt(e.target.value);
    cart.updateCart(e.target.name, num)
      this.loadStorageinfo();
}

paypalSubmit(e){
  e.preventDefault();
  // grab localhost data
    const lsCart = JSON.parse(localStorage.cart);
    const lsShipAddress = JSON.parse(localStorage.shipping_address)[0];
    const lsUser = JSON.parse(localStorage.the_main_app).token;

    console.log('==================lsCart====================');
    console.log(lsCart);
    console.log('==============lsShipAddress=================');
    console.log(lsShipAddress)
    console.log('===================End======================');
  // save new order in mongodb using axios
    axios.post('/api/placeorder', {
      products: lsCart,
      customer_name: lsShipAddress.customer_name,
      customer_email: lsShipAddress.customer_email,
      shipping_address: lsShipAddress,
      user: lsUser,
    })


}


  render(){

    if(this.state.products.length <= 0){
      alert("Your cart is empty!")
      // this.props.history.push("/")
      window.location = "/";
    }

    const ShowInCart = ({items}) => (
      <div>
        {items.map((item, i)=>
          <AddProduct
            key={i}
            {...item}
            name = {i}
            qtyChangeHandler = {this.qtyChangeHandler.bind(this)}
            removeInCart = {this.removeInCart.bind(this)}
          />
        )}
      </div>
    )

    const onSuccess = (payment) => {
        // console.log('Successful payment!', payment);
        if(payment.paid === true){
          alert("your payment is successful");
          // window.location = '/receipt'
        }
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


    // console.log(Details)
    // console.log(Total)

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return(
      <>
        <div id="cart_container" className="s-iCol-12 col-6">
          <ShowInCart items={this.state.products}/>
          <div>
            <p className="fLeft">TOTAL</p>
            <h3 className="fLeft">$<b id="totalamount">{SubTotal}</b></h3>
          </div>
        </div>
        <button onClick={this.paypalSubmit.bind(this)}>Test Button</button>
        <div className="s-iCol-12 col-6">
          <Checkout />
          <PaypalButton
            client={CLIENT}
            env={'sandbox'}
            commit={true}
            currency={'USD'}
            total={Total}
            items={Items}
            details= {Details}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onCancel}
          />
        </div>
      </>
    )
  }
}

export default CartPage;
