import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Cart from './cart-helper';
import axios from "axios";

// import parts
import GuessAddress from './guessAddress';
// import ShowAddress from './showAddress';
import AddedProductsContainer from './addedProductsContainer';
import MemberSignUp from './MemberSignUp';
import ShowAddress from './ShowAddress';

class CartPage extends Component{
  constructor(props){
    super(props);
    this.state={
      products: Cart.getCartItems(),
      signupActive: true,
      signUpEmail: "",
      signUpPassword: "",
      signUpError: '',
      token: '',
      checkOutActive: false,
      clickMember: false
    }
  }

  componentDidMount(){
    if(localStorage.shipping_address)
    this.setState({
      address: JSON.parse(localStorage.shipping_address)[0]
    })
  }

  backToProductsPage(e){
    e.preventDefault();
    this.props.history.push(`/products`)
  }

  removeInCart(i){
    // console.log(e.target.getAttribute('data-value'))
    Cart.removeItem(i);
    this.setState(prevState=>({
      ...prevState,
      products: Cart.getCartItems()
    }))
  }

  qtyChangeHandler(e){
    const pos = e.target.getAttribute('data-list');
    const value = parseInt(e.target.value);
    Cart.updateCart(pos, value)
      this.setState(prevState=>({
        ...prevState,
        products: Cart.getCartItems()
      }));
  }




  confirmSubmit(e){
    e.preventDefault();
      const lsCart = [];
      JSON.parse(localStorage.cart).forEach(cartData=>{
        lsCart.push({
          product: cartData.product._id,
          quantity: cartData.quantity,
          retail: cartData.retail,
        })
      });
    const newAddress = JSON.parse(localStorage.shipping_address)[0];
    const lsShipAddress = [];
      lsShipAddress.push({
        recipient_name: newAddress.recipient_name,
        address1: newAddress.line1,
        address2: newAddress.line2,
        city: newAddress.city,
        state: newAddress.state,
        zipcode: newAddress.postal_code,
        country: newAddress.country_code,
        phone: newAddress.phone,
      })

      console.log(lsCart)
  // Upload data into database
  axios.post('/api/placeorder', {
      products: lsCart,
      customer_name: newAddress.customer_name,
      customer_email: newAddress.customer_email,
      shipping_address: lsShipAddress[0],
      user: tkid.data
      })
        .then(orderData => {
          console.log(orderData.data._id)
        // window.location=`/checkout/${orderData.data._id}`
        })
  } //end

  onTextboxChangeSignUpEmail(e){
    this.setState({
     signUpEmail: e.target.value,
    })
  }
  onTextboxChangeSignUpPassword(e){
    this.setState({
     signUpPassword: e.target.value,
    })
  }
  onSignUp(){
      const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      if(emailCheck.test(this.state.signUpEmail) === false){
        alert("Please input correct email format")
      } else if(this.state.signUpPassword.length < 8){
        alert("Your password have to be more than 8 characters")
      } else {
        const { signUpEmail, signUpPassword } = this.state;
        // active signup input
        this.setState({
          isLoading: true,
        });

        // Take input data and signUp new User
        axios.post('/api/user/signup', {
          email: signUpEmail,
          password: signUpPassword
        })
          .then(res => {
            if(res.status === 200){
              this.setState({
                signUpError: "Signup successful"
              }, ()=>{
                axios.post('/api/user/signin', {
                  email: this.state.signUpEmail,
                  password: this.state.signUpPassword,
                })
                  .then(res=>{
                    // console.log(res)
                    if(res.status === 200){
                      localStorage.setItem('the_main_app', JSON.stringify({ token: res.data.token }))
                      this.setState({
                        token: res.data.token
                      }
                      // ,()=>{
                      //   this.props.history.push({
                      //     pathname: `/auth/products/`
                      //   })
                      // }
                    )}
                  })
              })
            } else {
              this.setState({
                signUpError: "There is a problem"
              })
            }
          })

      }
  }

  basicCheckOut(e){
    e.preventDefault();

    const lsCart = [];
    JSON.parse(localStorage.cart).forEach(cartData=>{
      lsCart.push({
        product: cartData.product._id,
        quantity: cartData.quantity,
        retail: cartData.retail,
      })
    });
    if(!localStorage.shipping_address){
      alert("Address is missing")
    } else {
    const newAddress = JSON.parse(localStorage.shipping_address)[0];
    const lsShipAddress = [];
      lsShipAddress.push({
        recipient_name: newAddress.recipient_name,
        address1: newAddress.line1,
        address2: newAddress.line2,
        city: newAddress.city,
        state: newAddress.state,
        zipcode: newAddress.postal_code,
        country: newAddress.country_code,
        phone: newAddress.phone,
      })

    axios.post('/api/placeorder', {
        products: lsCart,
        customer_name: newAddress.customer_name,
        customer_email: newAddress.customer_email,
        shipping_address: lsShipAddress[0],
        })
          .then(orderData => {
                this.props.history.push(`/base/cart/checkout/${orderData.data._id}`)
          })
      }

  }

  onBecomeAMember(){
    this.setState({
      clickMember: !this.state.clickMember
    })
  }

  render(){
    if(this.state.products.length <= 0){
      alert("Your cart is empty!")
      this.props.history.push("/")
    }

    const ShowInCart = ({products}) => (
      <div>
        {products.map((itemObj, i)=>
          <AddedProductsContainer
            {...itemObj}
            key={i}
            itemKey={i}
            qtyChangeHandler = {this.qtyChangeHandler.bind(this)}
            removeInCart = {this.removeInCart.bind(this, i)}
          />
        )}
      </div>
    )

  let SubTotal = (!localStorage.cart)?0:JSON.parse(localStorage.cart)
    .map(item=>{ return item.retail* item.quantity})
      .reduce((acc, curr)=>{
        return acc+curr
        }, 0);
  SubTotal = SubTotal.toFixed(2)

    return(
      <div>
        <div className="col-12">
          <button onClick={this.backToProductsPage.bind(this)}>
            BACK TO PRODUCTS PAGE
          </button>
        </div>
        <br />
        <div id="cart_container" className="s-iCol-12 col-6">
          <h1>Cart Page</h1>
          <ShowInCart products={this.state.products}/>
          <div>
            <p className="fLeft">TOTAL</p>
            <h3 className="fLeft">$<b id="totalamount">{SubTotal}</b></h3>
          </div>
        </div>

        <div id="cart_container" className="s-iCol-12 col-6">
          <div>
            <button className={this.state.clickMember?"hide": ""} onClick={this.onBecomeAMember.bind(this)}><b>Become a Member</b></button>
            <span className={this.state.clickMember?"": "hide"}>
              <MemberSignUp />
            </span>
          </div>
          <div>
            <button className={this.state.clickMember?"": "hide"} onClick={this.onBecomeAMember.bind(this)}><b>Continue as Guess</b></button>
            <span className={this.state.clickMember?"hide": ""}>
              {(localStorage.shipping_address)?null:<GuessAddress />}
            </span>
          </div>
          <div>
            {(localStorage.shipping_address)?<ShowAddress />: null}
          </div>
        </div>
        <button
          disabled={(this.state.checkOutActive)?true: false}
          onClick={this.basicCheckOut.bind(this)}>
          CHECKOUT
        </button>

      </div>
    )
  }
}

export default CartPage;
