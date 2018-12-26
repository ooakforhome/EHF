import React, { Component } from 'react';
import AddProduct from './parts/add_product';
import cart from './cart-helper';
import { Redirect } from 'react-router-dom';
import axios from "axios";

// import parts
import AddAddress from './addAddress';
import ShowAddress from './showAddress';

class CartPage extends Component{

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

// confirmSubmit(e){
//   e.preventDefault();
//   // optimize localhost data into database format
//     const lsUser = JSON.parse(localStorage.the_main_app).token;
//     const lsCart = [];
//     JSON.parse(localStorage.cart).forEach(cartData=>{
//       lsCart.push({
//         product: cartData.product._id,
//         quantity: cartData.quantity,
//         retail: cartData.retail,
//       })
//     });
//     const newAddress = JSON.parse(localStorage.shipping_address)[0];
//     const lsShipAddress = [];
//       lsShipAddress.push({
//         recipient_name: newAddress.recipient_name,
//         address1: newAddress.line1,
//         address2: newAddress.line2,
//         city: newAddress.city,
//         state: newAddress.state,
//         zipcode: newAddress.postal_code,
//         country: newAddress.country_code,
//         phone: newAddress.phone,
//       })
//
//   // Upload data into database
//   axios.post('/api/placeorder', {
//       products: lsCart,
//       customer_name: newAddress.customer_name,
//       customer_email: newAddress.customer_email,
//       shipping_address: lsShipAddress[0],
//       user: lsUser
//       })
//         .then(data=>{
//           console.log("---------api placeholder----------")
//           console.log(data)
//         })
//     }


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

    let SubTotal = (!localStorage.cart)?0:JSON.parse(localStorage.cart)
      .map(item=>{ return item.retail* item.quantity})
        .reduce((acc, curr)=>{
          return acc+curr
          }, 0);

    return(
      <>
        <div id="cart_container" className="s-iCol-12 col-6">
          <ShowInCart items={this.state.products}/>
          <div>
            <p className="fLeft">TOTAL</p>
            <h3 className="fLeft">$<b id="totalamount">{SubTotal}</b></h3>
          </div>
        </div>

        <div className="s-iCol-12 col-6">
          {(!localStorage.shipping_address)?<AddAddress />: <ShowAddress />}
        </div>
      </>
    )
  }
}

export default CartPage;
        // <button onClick={this.confirmSubmit.bind(this)}>Test Button</button>
