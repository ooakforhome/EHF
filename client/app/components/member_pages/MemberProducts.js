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
import { ProductsBox } from './parts/ProductsBox';

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

// mount Redux data info.
  componentWillMount() {
    this.checkValidation();
    this.getInCartNumber();
    this.getCartItemIds();
  }

  componentDidMount(){
    API.loadUserIdByToken(JSON.parse(localStorage.getItem('the_main_app')).token)
      .then(id => {
        this.setState({cID: id.data})
      })
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
            this.loadDatas();
          } else {
            window.location =`/`;
          }
        });
    } else {
        window.location =`/`;
    }
  }


  loadDatas(){
    const {limit, offset} = this.state;
    const theName = this.state.Category_type.split(' ').join('+');
    this.props.renderMember({
      limit: limit,
      offset: offset,
      Category_type: theName
    })
  }

  // Categories link
  handleClickthenav(e){
    e.preventDefault();
    const theName = e.target.id.split(' ').join('+'); // query need + in between space
    this.setState({
      limit: 10,
      offset: 0,
      Category_type: e.target.id
    })
    this.props.renderMember({limit: 10, offset: 0, Category_type:theName})
  };

// ProductsBox
  handleClick(e){
    e.preventDefault();
      window.location =`/auth/product/${e.target.value}`;
  }

  nexthandleChange(){
    const totalOffset = Math.floor(this.props.newproducts.count/10);
    const {limit, offset} = this.state;
    let theName = this.state.Category_type.split(' ').join('+');


    if(this.state.offset >= totalOffset){
      this.props.renderMember({limit: limit, offset: offset, Category_type:theName})
      this.setState({ offset: totalOffset })
    } else {
      this.props.renderMember({limit: limit, offset: offset+1, Category_type:theName})
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
    this.updates();
  };

  updates(){
    const theName = this.state.Category_type.split(' ').join('+'); // query need + in between space
    this.props.renderMember({Category_type: theName, limit: this.state.limit, offset: this.state.offset});
  };

  // showinfo(){
  //   let inLocal = JSON.parse(localStorage.getItem('cart')).length;
  //   return document.querySelector('.showLocalAmount').textContent= inLocal;
  // }


  addToCart(e){
    e.preventDefault();
    const theId = e.target.value;

    axios.get(`/api/member/product/${theId}`)
      .then(item => {
        // console.log("-------indexof-------")
        // console.log((this.state.itemsInCart.indexOf(item.data._id) < 0) == true)
        if(this.state.itemsInCart.indexOf(item.data._id) >= 0){
          alert("item already added")
        } else {
        // console.log(item)
          axios.post(`/api/cart/addtocart`, {
            product_name: item.data.Product_Name,
            quantity: item.data.quantity,
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

  showAdded(){
    console.log(this.state.itemsInCart)
    // if(this.state.itemsInCart.length > 0){
    //   this.state.itemsInCart.forEach((_id)=>{
    //     return document.querySelector(`[data-item='${_id}']`).classList.add('bk-yes');
    //   })
    // } else{
    //   console.log("No Item")
    // }
  }

  getCartItemIds(){
    const token = JSON.parse(localStorage.getItem('the_main_app')).token;
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
          .then(()=>{
            this.showAdded();
          })
  }

  getInCartNumber() {
    const token = JSON.parse(localStorage.getItem('the_main_app')).token;
    API.showUserCart(token)
      .then(inCart => {
        this.setState({amountInCart: inCart.data.length})
      })
  }

  searchBoxValue(e){
    e.preventDefault();
    this.setState({
      searchBox: e.target.value
    })
  }

  searchBoxInput(e){
    e.preventDefault();
    this.props.searchBoxMember(this.state.searchBox)
    // API.memberSearchProduct(this.state.searchBox)
    //   .then(products => {
    //     console.log(products.data);
    //   })
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


  render() {
    if(!this.props.newproducts.all){
      return "waiting for data";
    }

    const TotalPages = Math.ceil(this.props.newproducts.count/10);
    const CurrentPage = this.state.offset + 1;
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
          < Categories clickthenav = { this.handleClickthenav.bind(this) } />
        </div>
        <div>
          <input
            className="col-6 input-space"
            type="search"
            name="searchBox"
            placeholder="What do you want to search?"
            onChange = {this.searchBoxValue.bind(this)}
             />
          <button onClick={this.searchBoxInput.bind(this)}>Search</button>
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

export default connect(mapStateToProps, { renderMember, searchBoxMember })(MemberProducts);
