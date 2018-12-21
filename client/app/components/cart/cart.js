import React, { Component } from 'react';
import AddProduct from './parts/add_product';
import cart from './cart-helper';
import { Redirect } from 'react-router-dom';

// import parts
import Checkout from './checkout';
import PaypalButton from './paypal/PaypalButton.js';


const CLIENT = {
  sandbox: 'AeK8ZZ1wQQvzSlZBRhS0mjHSz5JOguwuR8wi7yleu4byGxwuhZw86Xjow7iyz2TWJ_9Yz3dl0W2uMg4k',
  production: 'AeK8ZZ1wQQvzSlZBRhS0mjHSz5JOguwuR8wi7yleu4byGxwuhZw86Xjow7iyz2TWJ_9Yz3dl0W2uMg4k'
}


class Cart extends Component{
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

  render(){

    if(this.state.products.length <= 0){
      alert("Your cart is empty!")
      // this.props.history.push("/")
      window.location = "/";
    }

    const ShowInCart = ({items}) => (
      <div>
        {items.map((item, i)=>
          <AddProduct key={i} {...item}
            name = {i}
            qtyChangeHandler = {this.qtyChangeHandler.bind(this)}
            removeInCart = {this.removeInCart.bind(this)}
          />
        )}
      </div>
    )

    const onSuccess = (payment) => {
        console.log('Successful payment!', payment);
        if(payment.paid === true){
          alert("your payment is successful");
          // window.location = '/receipt'
        }
    }

    let Total = (!localStorage.cart)?0:JSON.parse(localStorage.cart)
      .map(item=>{ return item.retail* item.quantity})
        .reduce((acc, curr)=>{
          return acc+curr
          }, 0);
    const tax = 0.07;

    let Items = [];
      (!localStorage.cart)?'':JSON.parse(localStorage.cart).forEach(item => Items.push({
        name: item.product.Product_Name,
        description: item.product.Product_Name,
        quantity: item.quantity,
        price: item.retail+parseFloat((item.retail*tax).toFixed(2)),
        sku: item.product.SKU,
        tax: parseFloat((item.retail*tax).toFixed(2)),
        currency: "USD",
      })
    );

    const Address = {
      recipient_name: "test",
      line1: "223 lkjlkj st",
      line2: "apt 1",
      city: "atl",
      country_code: "us",
      postal_code: "30340",
      phone: "1233456789",
      state: "ga",
    };
      // (!localStorage.shipping_address)?'': Address.push(JSON.parse(localStorage.shipping_address));
      // console.log(Address[0])

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
            <h3 className="fLeft">$<b id="totalamount">{Total}</b></h3>
          </div>
        </div>
        <div className="s-iCol-12 col-6">
          <Checkout />
        </div>
        <div>
          <PaypalButton
            client={CLIENT}
            env={'sandbox'}
            commit={true}
            currency={'USD'}
            total={Total}
            items={Items}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onCancel}
          />
        </div>
      </>
    )
  }
}

export default Cart;
