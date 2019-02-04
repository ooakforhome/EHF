import React, { Component } from 'react';
import AddProduct from './parts/add_product';
import cart from './cart-helper';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { setInStorage, getFromStorage } from '../utils/storage';

// import parts
import Add_Address from './add_address';
import Show_Address from './show_address';

class CartPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      products: [],
      address: [],
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

  componentDidMount(){
    this.loadStorageinfo();
    this.loadGrandTotal();
    this.getUserAddress();
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
      this.setState({
        grandTotal: newTotal.toFixed(2)
      })
    })
  }

  removeInCart(e){
    const theOne = e.target.name;
    cart.removeItem(theOne);
    this.loadStorageinfo();
    this.loadGrandTotal();
  }

  qtyChangeHandler(e){
    e.preventDefault()
    let num = parseInt(e.target.value);
    const item_id = e.target.id;
    cart.updateCart(item_id, num);
    this.loadStorageinfo();
    this.loadGrandTotal();
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
            address: [{
              recipient_name: gA.address.recipient_name,
              address1: gA.address.address1,
              address2: gA.address.address2,
              city: gA.address.city,
              state: gA.address.state,
              zipcode: gA.address.zipcode,
              country: "USA",
              phone: gA.address.phone,
            }]
          })
        })
    })
  }

  addressChange(e){
    e.preventDefault();
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
        }
      })
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
          this.getUserAddress();
          window.location="/cart"
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
    // optimize localhost data into database format
      // Set token variable
      const tk = JSON.parse(localStorage.the_main_app).token;
      // Set a empty array for cart item input
      const lsCart = [];

      cart.getCart(items => {
        items.data.forEach(item => {
          lsCart.push(item)
        })
      });

  const newaddress = this.state.address[0];

      //--> Upload data into database
  axios.get(`/api/user/findidbytoken?_id=${tk}`)
    .then(tkid => {
      axios.post('/api/placeorder', {
        products: lsCart,
        customer_name: this.state.username,
        customer_email: this.state.email,
        shipping_address: newaddress,
        user: tkid.data
        })
          .then(orderData => {
          window.location=`/checkout/${orderData.data._id}`
          })
      })
  }


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
            removeInCart = {this.removeInCart.bind(this)}
          />
        )}
      </div>
    )

    const GrandTotal = 0;

    // Toggle add or show address
    const TriggerAddress = () => {
        if(this.state.address1 !== undefined ){
         return  (
          <Show_Address
            user = {this.state.username}
            email = {this.state.email}
            recipient_name = {this.state.recipient_name}
            address1 = {this.state.address1}
            address2 = {this.state.address2}
            city = {this.state.city}
            state = {this.state.state}
            zipcode = {this.state.zipcode}
            country = {this.state.country}
            phone = {this.state.phone}
            triggerUpdate = {this.triggerUpdate.bind(this)}
            addressChange = {this.addressChange.bind(this)}
            formUpdate = {this.formUpdate.bind(this)}
            />
          )
        } else {
        return (
          <Add_Address
            addressChange = {this.addressChange.bind(this)}
            formSubmit = {this.formSubmit.bind(this)}
            />
          )
        }
    }

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
          <TriggerAddress />
          <br />
          <button onClick={this.confirmSubmit.bind(this)}>CHECKOUT</button>
        </div>
      </>
    )
  }
}

export default CartPage;
// <div className="s-iCol-12 col-6">
  // {(!localStorage.shipping_address)?<AddAddress />: <ShowAddress />}
  // {(!localStorage.shipping_address)? "":
  // <button onClick={this.confirmSubmit.bind(this)}>CHECKOUT</button>}
// </div>


// {(this.state.address.address1 === "")?
//   <Add_Address
//     addressChange = {this.addressChange.bind(this)}
//     formSubmit = {this.formSubmit.bind(this)}
//   /> :
//   <ShowAddress />}
