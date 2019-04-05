import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import API from './api_helper';
import Categories from '../componentParts/Categories';

import { renderMember, searchBoxMember } from '../../actions/member-action';
import { setInStorage, getFromStorage } from '../utils/storage';

import MemberHeader from './parts/MemberHeader';
import MemberProfile from "./parts/MemberProfile";
import ProductsBox from './parts/ProductsBox';

import cart from './cart/cart-helper';


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
      token:JSON.parse(localStorage.getItem('the_main_app')).token,
      Category_type: "Accent Furnitures",
    }
  }

// mount Redux data info.
  componentWillMount() {
    this.checkValidation();
    this.getInCartNumber();
    this.getCartItemIds();
    this.getItemInCart();
    this.getUserId();
  }



  checkValidation(){
    const { token } = this.state;

    axios.get(`/api/user/verify?token=${token}`)
      .then(res =>{
        if(res.status === 200){
          this.props.renderMember({token: token, limit: 10, offset: 0, Category_type:this.state.Category_type})
        } else {
          window.location =`/`;
        }
      })
  }

  getUserId(){
    API.loadUserIdByToken(this.state.token)
        .then(id => {
          this.setState({
            cID: id.data,
          })
        })
  }
  getItemInCart(){
    API.loadUserByToken(this.state.token)
      .then(info => {
        if(info.data.items_in_cart){
          this.setState({
            itemsInCart: info.data.items_in_cart
          })
        }
      })
  }
  getCartItemIds(){
    const { token } = this.state;
    const pID = [];
    API.showUserCart(token)
      .then(items => {
        if(items){
          items.data.forEach(item=>{
            pID.push(item.itemID)
          })
          this.setState({
            itemsInCart: pID
          })
        }
      })
  }
  getInCartNumber() {
    const { token } = this.state;;
    API.showUserCart(token)
      .then(inCart => {
        this.setState({amountInCart: inCart.data.length})
      })
  }
// MemberHeader component
  showProfileBlock(){
  document.querySelector(".memberProfileBlock").classList.toggle("hide")
  }
  onclick_logout(e){
  e.preventDefault();
  const { token } = this.state;

  API.memberLogout(token)
    .then( respond => {
      if(respond.data.success === false){
        alert("logout unsuccessful");
      } else {
        localStorage.removeItem('the_main_app');
        this.props.history.push('/');
      }
    })
}
// Categories Component
  handleClickthenav(e){
    e.preventDefault();
    const theName = e.target.id.split(' ').join('+'); // query need + in between space
    this.setState({
      menuActive: !this.state.menuActive,
      limit: 10,
      offset: 0,
      Category_type: e.target.id
    })
    this.props.renderMember({token:this.state.token, limit: 10, offset: 0, Category_type:theName})
  };
// ProductList Component
  handleClick(e){
    e.preventDefault();
      window.location =`/auth/product/${e.target.value}`;
  }
  addToCart(e){
    e.preventDefault();
    const {token} = this.state;
    const theId = e.target.value;
    API.findSingleProductById(token,theId)
      .then(item => {
        if(this.state.itemsInCart.includes(item.data._id)){
          alert("item already added")
        } else {
        // console.log(item)
          API.addToCart({
            product_name: item.data.Product_Name,
            quantity: 1,
            price: item.data.Retail,
            image: item.data.images,
            itemID: item.data._id,
            userID: this.state.cID
          })
        .then(()=>{
          this.getCartItemIds();
          this.getInCartNumber();
        })
      }
    })
  }
// Search Input
  searchBoxValue(e){
    e.preventDefault();
    const { token } = this.state;
    this.props.searchBoxMember({searchValue: e.target.value.trim(), token})
    // this.setState({
    //   searchBox: e.target.value
    // })
  }
// PageBtn Component
  nexthandleChange(){
    const totalOffset = Math.floor(this.props.newproducts.count/10);
    const {limit, offset, token} = this.state;
    let theName = this.state.Category_type.split(' ').join('+');

    if(this.state.offset >= totalOffset){
      this.props.renderMember({token, limit, offset, Category_type:theName})
      this.setState({ offset: totalOffset })
    } else {
      this.props.renderMember({token , limit, offset: offset+1, Category_type:theName})
      this.setState({ offset: this.state.offset+=1 })
    }
  };
  prevhandleChange(e){
    e.preventDefault();
      if(this.state.offset == 0){
        this.setState({limit:10, offset: 0})
      } else {
      this.setState({
        limit: 10,
        offset: this.state.offset-=1
      })
    }
    this.loadDatas();
  };

  categorybutton(){
    this.setState({
      menuActive: !this.state.menuActive
    })
  }

// helpers
  loadDatas(){
    const {limit, token, offset} = this.state;
    const theName = this.state.Category_type.split(' ').join('+');
    this.props.renderMember({
      token,
      limit,
      offset,
      Category_type: theName
    })
  }

  render() {
    if(!this.props.newproducts.all){
      return "waiting for data";
    }

    console.log(this.props.newproducts)

    const TotalPages = Math.ceil(this.props.newproducts.count/10);
    const CurrentPage = this.state.offset + 1;
    const ProductList = ({products}) => (
      <div>
        {products.map((product, i) =>
          <ProductsBox key={i}
                  {...product}
                  cart = {this.state.itemsInCart}
                  handleClick={this.handleClick.bind(this)}
                  addToCart={this.addToCart.bind(this)}
                  />
        )}
    </div>
  )

    const PageBtn = () => (
      <div className ="floatleftblock">
        <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
        <p>Page: { CurrentPage } of { TotalPages }</p>
        <p>Total: {this.props.newproducts.count}</p>
        <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
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
          < Categories
            clickthenav = { this.handleClickthenav.bind(this) }
            categorybutton = { this.categorybutton.bind(this) }
            menuActive = {this.state.menuActive}
            />
        </div>
        <div>
          <input
            className="col-6 input-space"
            type="search"
            name="searchBox"
            placeholder="What do you want to search?"
            onChange = {this.searchBoxValue.bind(this)}
             />
        </div>
        <div className="memberProfileBlock hide"><MemberProfile /></div>
        <div className="products_box">
          <h1>{this.state.Category_type}</h1>
            <PageBtn />
          <div>
            <ProductList products = {this.props.newproducts.all} />
          </div>
            <PageBtn />
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  newproducts : state.memberproducts.products,
  newproduct  : state.memberproducts.product,
});

const mapDispatchToProps = (dispatch) => {
    return {
        renderMember: ({token, limit, offset, Category_type}) => dispatch(renderMember({token, limit, offset, Category_type})),
        searchBoxMember: ({token, id}) => dispatch(searchBoxMember({token, id}))
    };
};

export default connect(mapStateToProps, { renderMember, searchBoxMember })(MemberProducts);
