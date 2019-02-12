import React, { Component } from 'react';
import AddProduct from './parts/add_product';
import cart from './cart-helper';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { setInStorage, getFromStorage } from '../utils/storage';

// import parts
import Show_Address from './show_address';
import Update_Address from './update_address';

class CartPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      products: [],
      address: {},
      grandTotal: 0,
      username: "",
      email: "",
      recipient_name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
    }
  }

  componentWillMount() {
    this.checkValidation();
  }

  checkValidation(){
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      fetch('/api/user/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
            this.loadStorageinfo();
            this.loadGrandTotal();
            this.getUserAddress();
          } else {
            window.location =`/`;
          }
        });
    } else {
        window.location =`/`;
    }
  }

  loadStorageinfo(){
    cart.getCart(items =>{
      this.setState({
        products: items.data
      })
    })
  }

  loadGrandTotal(){
    cart.calculateCartTotal( newTotal => {
      if( !newTotal){
        this.setState({
          grandTotal: 0
        })
      } else {
        this.setState({
          grandTotal: newTotal.toFixed(2)
        })
      }
    })
  }

  removeInCart(e){
    const theOne = e.target.name;
    cart.removeItem(theOne);
    this.loadStorageinfo();
    this.loadGrandTotal();
  }

  qtyChangeHandler(e){
    let num = e.target.value;
    const item_id = e.target.id;
    cart.updateCart(item_id, num)
  }

  updateQty(e){
    e.preventDefault();
      this.loadStorageinfo()
      this.loadGrandTotal()
  }

  backToProductsPage(){
    const token = JSON.parse(localStorage.the_main_app).token;
    {(token) ? `/auth/products/`: '/' }
    window.location = `/auth/products/`
    // window.location = `/auth/products/${token}`
  }

  getUserAddress(){
    cart.userId( id => {
      axios.get(`/api/user/finduseraddress?userID=${id.data}`)
        .then( getAddress =>{
          const gA = getAddress.data;
          this.setState({
            username: gA.username,
            email: gA.email,
            recipient_name: gA.address.recipient_name,
            address1: gA.address.address1,
            address2: gA.address.address2,
            city: gA.address.city,
            state: gA.address.state,
            zipcode: gA.address.zipcode,
            phone: gA.address.phone,
            address: {
              recipient_name: gA.address.recipient_name,
              address1: gA.address.address1,
              address2: gA.address.address2,
              city: gA.address.city,
              state: gA.address.state,
              zipcode: gA.address.zipcode,
              country: "USA",
              phone: gA.address.phone,
            }
          })
        })
    })
  }

  addressChange(e){
    this.setState({
      [e.target.name]: e.target.value.trim()
    })
  }

  formSubmit(e){
    e.preventDefault();
    cart.userId(id=>{
      axios.post(`/api/user/userupdate?_id=${id.data}`, {
        username: this.state.username,
        shipping_address : {
          recipient_name : this.state.recipient_name,
          address1 : this.state.address1,
          address2 : this.state.address2,
          city : this.state.city,
          state : this.state.state,
          zipcode : this.state.zipcode,
          country : "USA",
          phone : this.state.phone
          }
      })
      .then((info, err)=>{
        if(err){console.log(err)}
        else{
          this.getUserAddress();
          this.triggerUpdate();
        }
      })
    })
  }

  addressUpdateChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formUpdate(e){
    e.preventDefault();
    cart.userId(id=>{
      axios.post(`/api/user/userupdate?_id=${id.data}`, {
        username: this.state.username,
        shipping_address : {
          recipient_name : this.state.recipient_name,
          address1 : this.state.address1,
          address2 : this.state.address2,
          city : this.state.city,
          state : this.state.state,
          zipcode : this.state.zipcode,
          country : "USA",
          phone : this.state.phone
          }
      })
      .then((info, err)=>{
        if(err){console.log(err)}
        else{
          // console.log(info)
          this.getUserAddress();
          this.triggerUpdate();
        }
      })
    })
  }

  triggerUpdate(){
    document.querySelector('.show_address_container').classList.toggle("hide");
    document.querySelector('.update_address_btn').classList.toggle("hide");
    document.querySelector('.update_address_box').classList.toggle("hide");
    document.querySelector('.change_address_btn').classList.toggle("hide");
  }

  confirmSubmit(e){
    e.preventDefault();
    let productsInfo = [];
    this.state.products.forEach(product => {
      productsInfo.push(
        {
        product_id: product._id,
        product_name: product.product_name,
        purchase_price: product.purchase_price,
        quantity: product.quantity}
      )
    })

    cart.userId(id => {
      axios.post('/api/placeorder', {
        products: productsInfo,
        customer_name: this.state.username,
        customer_email: this.state.email,
        shipping_address: this.state.address,
        user: id.data
      })
      .then(orderData => {
      window.location=`/checkout/${orderData.data._id}`
      })
      .catch(err => {console.log("confirmSubmit error")})
    })
  }

  // confirmSubmit(e){
  //   e.preventDefault();
  //   // optimize localhost data into database format
  //     // Set token variable
  // const tk = JSON.parse(localStorage.the_main_app).token;
  //
  //     //--> Upload data into database
  // axios.get(`/api/user/findidbytoken?_id=${tk}`)
  //   .then(tkid => {
  //     axios.post('/api/placeorder', {
  //       products: this.state.products,
  //       customer_name: this.state.username,
  //       customer_email: this.state.email,
  //       shipping_address: this.state.address,
  //       user: tkid.data
  //       })
  //         .then(orderData => {
  //         window.location=`/checkout/${orderData.data._id}`
  //         })
  //     })
  // }

  render(){
    // if(!this.state.address[0]){
    //   alert("Your cart is empty!")
    //   // this.props.history.push("/")
    //   window.location = "/";
    // }
    const ShowInCart = ({items}) => (
      <div>
        {items.map((item, i)=>
          <AddProduct
            key={i}
            {...item}
            qtyChangeHandler = {this.qtyChangeHandler.bind(this)}
            updateQty = {this.updateQty.bind(this)}
            removeInCart = {this.removeInCart.bind(this)}
            totalPrice = {((item.quantity) * (item.purchase_price)).toFixed(2)}
          />
        )}
      </div>
    )

    const GrandTotal = 0;

    return(
      <>
        <div className="col-12">
            <button onClick={this.backToProductsPage.bind(this)}>
              BACK TO PRODUCTS PAGE
            </button>
        </div>
        <br />
        <div id="cart_container" className="s-iCol-12 col-6">
          <ShowInCart items={this.state.products}/>
          <div>
            <p className="fLeft">TOTAL</p>
            <h3 className="fLeft">$<b id="totalamount">{this.state.grandTotal}</b></h3>
          </div>
        </div>
        <hr className="s-iCol-12 col-12"/>
        <div className="s-iCol-12 col-12">
        <Show_Address
          {...this.state.address}
          user = {this.state.username}
          email = {this.state.email}
        />
        <div className="update_address_box hide">
          <Update_Address
            formUpdate = {this.formUpdate.bind(this)}
            addressUpdateChange = {this.addressUpdateChange.bind(this)}
          />
        </div>
        <button
          className="update_address_btn" onClick={this.triggerUpdate.bind(this)}>UPDATE</button>
        </div>
        <br />
        <button onClick={this.confirmSubmit.bind(this)}>CHECKOUT</button>
      </>
    )
  }
}

export default CartPage;
