import React, { Component } from 'react';
import AddProduct from './parts/add_product';
import cart from './cart-helper';
import { Redirect } from 'react-router-dom';

// import parts
import Checkout from './checkout';
// import PaypalButton from './paypal/PaypalButton.js';

class Cart extends Component{


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
    let Total = JSON.parse(localStorage.cart).map(item=>{ return item.retail* item.quantity}).reduce((acc, curr)=>{
      return acc+curr
    }, 0)

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
    if(this.state.products.length === 0){
      alert("Your cart is empty!")
      this.props.history.push("/")
    }

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
      </>
    )
  }
}

export default Cart;
