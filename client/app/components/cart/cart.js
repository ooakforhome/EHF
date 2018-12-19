import React, { Component } from 'react';
import AddProduct from './parts/add_product';
import cart from './cart-helper';
import { Redirect } from 'react-router-dom';

// import parts
import Checkout from './checkout';
import PaypalButton from './paypalButton';

class Cart extends Component{

componentWillMount(){
  this.loadStorageinfo();
}

componentDidMount(){
  this.totalAmount();
}

componentDidUpdate(){
  this.totalAmount();
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


totalAmount(){
  let total = 0;
  const doc = document.querySelectorAll("#gTotal");
    for(var i = 0; i < doc.length; i++){
      total += parseInt(doc[i].textContent);
    }
    return document.querySelector("#totalamount").textContent = total;
}

  render(){

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
            <h3 className="fLeft">$<b id="totalamount">$$</b></h3>
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
