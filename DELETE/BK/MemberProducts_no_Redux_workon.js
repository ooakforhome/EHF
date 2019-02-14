import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import API from './api_helper';

import { renderMember, searchBoxMember } from '../../actions/member-action';
import Categories from '../componentParts/Categories';

import { setInStorage, getFromStorage } from '../utils/storage';

import MemberHeader from './parts/MemberHeader';
import MemberProfile from "./parts/MemberProfile";
import ProductsBox from './parts/ProductsBox';

import cart from '../cart/cart-helper';


//SPD to Products
class MemberProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountInCart: 0,
      itemsInCart: [],
      limit: 10,
      offset: 0,
      count: 0,
      token:'',
      Category_type: "Accent Furnitures"
    }
  }

  componentWillMount(){
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
            this.loadAllProduct()
          } else {
            window.location =`/`;
          }
        });
    } else {
        window.location =`/`;
    }
  }

// init loadData
  loadAllProduct(){
    API.getAllProducts(
      this.state.limit,
      this.state.offset,
      this.state.Category_type
    )
      .then( res => {
        console.log(res.data)
        this.setState({
          products: res.data.all
        })
      })
  }

  showProfileBlock(){
    document.querySelector(".memberProfileBlock").classList.toggle("hide")
  }
  onclick_logout(e){
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('the_main_app')).token

    API.memberLogout(token)
      .then( respond => {
        if(respond.data.success === false){
          alert("logout unsuccessful");
        } else {
          window.location = '/';
        }
      })
  }
  handleClickthenav(e){
    e.preventDefault();
    const theName = e.target.id.split(' ').join('+'); // query need + in between space
    this.setState({
      limit: 10,
      offset: 0,
      Category_type: e.target.id
    })
    // this.props.renderMember({limit: 10, offset: 0, Category_type:theName})
  };

// ProductList functions begin
  handleClick(e){
    e.preventDefault();
      window.location =`/auth/product/${e.target.value}`;
  }
  addToCart(e){
    e.preventDefault();
    const theId = e.target.value;

    API.findSingleProductById(theId)
      .then(item => {
        // console.log(item.data)
        // console.log("-------indexof-------")
        // console.log((this.state.itemsInCart.indexOf(item.data._id) < 0) == true)
        if(this.state.itemsInCart.indexOf(item.data._id) >= 0){
          alert("item already added")
        } else {
        // console.log(item)
          API.addToCart({
            product_name: item.data.Product_Name,
            quantity: item.data.quantity,
            price: item.data.Retail,
            image: item.data.images,
            itemID: item.data._id,
            userID: this.state.cID
          })
        .then(()=>{
          // this.getCartItemIds();
          // this.getInCartNumber();
        })
      }
    })
  }
// ProductList functions end



  render() {
    if(!this.state.products){
      return "waiting for data";
    }
    // console.log(this.state.products)

    const ProductList = ({products}) => (
      <div>
        {products.map((product, i) =>
          <ProductsBox key={i}
                  {...product}
                  handleClick={this.handleClick.bind(this)}
                  addToCart={this.addToCart.bind(this)}
                  />
        )}
    </div>
    )

    return(
      <div>
        <div className="col-12 inline_block">
          <MemberHeader
            showProfileBlock = {this.showProfileBlock.bind(this)}
            onclick_logout = {this.onclick_logout.bind(this)}
            amountInCart = {this.state.amountInCart}
          />
        </div>
        <div className="category_nav col-12 inline_block">
          < Categories clickthenav = { this.handleClickthenav.bind(this) } />
        </div>
        <div>
          <ProductList products = {this.state.products} />
        </div>
      </div>
    )
  }
}


export default MemberProducts;
