import React, { Component } from 'react';
import AddProduct from './parts/add_product';
import cart from './cart-helper';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { setInStorage, getFromStorage } from '../../utils/storage';

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
      showTaggle: true,
      updateAddress: false,
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
            },()=>{
              this.loadStorageinfo();
              this.loadGrandTotal();
              this.getUserAddress();
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
    cart.getUserAddress(
      getAddress => {
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
          this.validateFormInput();
      }
    )
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
          this.getUserAddress();
          this.triggerUpdate();
        }
      })
    })
  }

  validateFormInput(){
    const validate = [
      (/^\d+\s.*\s(st|dr|blvd)$/gi).test(this.state.address1),
      (/((apt|#|po)([\d\s])(\.{1,5}))?/gi).test(this.state.address2),
      (/(\d{5}(\-)?(\d{4})?)/gi).test(this.state.zipcode),
      (/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g).test(this.state.phone)
    ]
    if(validate.includes(false)){
      this.setState({updateAddress: true, showTaggle: !this.state.showTaggle})
    }
  }

  triggerUpdate(){
    this.setState({showTaggle: !this.state.showTaggle})
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
      .catch(err => {alert("PLEASE MAKE CORRECTION TO ADDRESS FORM")})
    })
  }

  render(){
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
// console.log(this.state.updateAddress)
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
          showTaggle = {this.state.showTaggle}
          user = {this.state.username}
          email = {this.state.email}
        />
        <div className={(!this.state.showTaggle)? "update_address_box": "update_address_box hide"}>
          <Update_Address
            state = {this.state.address.state}
            showTaggle = {this.state.showTaggle}
            formUpdate = {this.formUpdate.bind(this)}
            addressUpdateChange = {this.addressUpdateChange.bind(this)}
          />
        </div>
        <button
          className={(this.state.showTaggle)? "update_address_btn":"update_address_btn hide"}
          onClick={this.triggerUpdate.bind(this)}>UPDATE</button>
        </div>
        <br />
        <button disabled={(this.state.showTaggle)? "" : true} onClick={this.confirmSubmit.bind(this)}>CHECKOUT</button>
      </>
    )
  }
}

export default CartPage;
