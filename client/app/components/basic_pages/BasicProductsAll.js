import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Header } from '../core/Header';
import { ProductsBox } from './parts/ProductsBox';
import Categories from '../componentParts/Categories';
import API from './api-basic'
import Cart from './cart/cart-helper';
import { Route } from 'react-router-dom';
import axios from 'axios';
import addCartImg from "../../styles/image/add-shopping-cart.png"

class BasicProductsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      offset: 0,
      totalPage: 0,
      count: 0,
      token:'',
      Category_type: "Accent Furnitures",
      products: [],
      limitProducts: [],
      itemsInCart:((localStorage.cart)?JSON.parse(localStorage.cart).map(obj => (obj._id)):[]),
      inCart: 0,
      menuActive: false
    };
  }

// mount Redux data info.
  componentWillMount() {
    this.loadDatas();
  }

  loadDatas(){
    const {limit, offset, Category_type} = this.state;
    let startDisplay = (offset === 0? 0: offset*limit );
    let endDisplay = (offset+1) * limit;
    let incart = (JSON.parse(localStorage.getItem('cart')))? JSON.parse(localStorage.getItem('cart')).length: 0;

    API.loadProducts({category_type: Category_type})
    .then(info => {
      this.setState({
        inCart: incart,
        products: info.data.all,
        count: info.data.count,
        limitProducts: info.data.all.slice(startDisplay, endDisplay)
      })
    })
  }

  // Categories link
  handleClickthenav(e){
    e.preventDefault();
    const theName = e.target.id; // query need + in between space
    API.loadProducts({category_type: theName})
    .then(info => {
      this.setState({
        menuActive: !this.state.menuActive,
        products: info.data.all,
        count: info.data.count,
        limitProducts: info.data.all.slice(0, 10),
        Category_type: theName,
        inCart: 0,
        limit: 10,
        offset: 0
      })
    })
  };

  handleClick(e){
      e.preventDefault();
        this.props.history.push(`/product/${e.target.value}`)
        // window.location =`/product/${e.target.value}`;
  }

  handleDelete(e){
    e.preventDefault();
    API.deleteProduct(e.target.value)
      window.location.reload();
  }

  nexthandleChange(){
    const {limit, offset, products} = this.state;
    const lastPage = Math.floor(products.length/limit)
    const lastPageNumBeg = (lastPage)*limit;
    const lastPageNumEnd = products.length;
    const lastPageProducts = products.slice(lastPageNumBeg, lastPageNumEnd)
    let startDisplay = ( offset+1 ) * limit;
    let endDisplay = (startDisplay) + limit;
    let limitProducts = products.slice(startDisplay, endDisplay)

    if(offset === lastPage){
      this.setState({
        limitProducts: lastPageProducts
      })
    } else {
      this.setState({
        offset: offset+1,
        limitProducts: products.slice(startDisplay, endDisplay),
      })
    }
  }

  prevhandleChange(e){
    e.preventDefault();
    const {limit, offset, products, limitProducts} = this.state;

      if(this.state.offset === 0){
        this.setState({
          limitProducts
        })
      } else {
      this.setState({
        offset: this.state.offset-=1
      })
    }
    this.loadDatas()
  };

  searchBoxValue(e){
    e.preventDefault();
    const searchValue = e.target.value;
    const {offset, limit} = this.state;
    let startDisplay = (offset === 0? 0: offset*limit );
    let endDisplay = (offset+1) * limit;

    API.searchBox({
      searchValue
    })
    .then(info => {
      this.setState({
        products: info.data.all,
        limitProducts: info.data.all.slice(startDisplay, endDisplay),
        count: info.data.count,
        offset: 0,
      })
    })
  }

  // showinfo(){
  //   let inLocal = (localStorage.getItem('cart'))?JSON.parse(localStorage.getItem('cart')).length: 0;
  //   this.setState(preveState=>({
  //     ...preveState,
  //     inCart: inLocal,
  //   }))
  // }

  toBuy(e){
    e.preventDefault();
    const theId = e.target.value;
    const { itemsInCart } = this.state;
    let inLocal = (localStorage.getItem('cart'))?JSON.parse(localStorage.getItem('cart')).length: 0;
    // axios.get(`/api/member/product/${theId}`)
    axios.get(`/api/basic/product/${theId}`)
      .then((item, err) => {
        let itemID = item.data._id;
        if(localStorage.cart && this.state.itemsInCart.indexOf(itemID) > -1){
          alert("item already added")
        } else {
          Cart.addItem(item.data, ()=>{
            this.setState(preveState=>({
              ...preveState,
              inCart: inLocal+1,
              itemsInCart: itemsInCart.concat(itemID)
            }))
          })
        }
      })
  }

  categorybutton(){
    this.setState({
      menuActive: !this.state.menuActive
    })
  }

  render(){
    if(!this.state.products){
      return "waiting for data";
    }

    const ProductList = ({products}) => (
      <div>
        { products.map((product, i) => {
          return(
            <ProductsBox
                  key={product._id}
                  {...product}
                  innerClass = {(this.state.itemsInCart.indexOf(product._id) > -1)? "innerBody bk-yes": "innerBody"}
                  handleClick={this.handleClick.bind(this)}
                  toBuy = {this.toBuy.bind(this)}
                  />
            )}
        )}
      </div>
    )

    const PageBtn=()=>{
      const TotalPages = Math.ceil(this.state.count/this.state.limit);
      const CurrentPage = this.state.offset + 1;

      return(
      <div className ="floatleftblock">
        <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
        <p>Page: { CurrentPage } of { TotalPages }</p>
        <p>Total: {this.state.count}</p>
        <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
      </div>
      )
    }

    return(
      <div>
        <Header />
        <div className="cartContainer">
          <Link to="/base/cart">
            <img src={addCartImg} style={{width: "50px", height: "50px"}}/>
            <p className="amountInCart"><b>{this.state.inCart}</b></p>
          </Link>
        </div>
        <div className="category_nav">
          <Categories
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

        <div className="products_box">
          <h1>{this.state.Category_type}</h1>
          <PageBtn />
          <div>
            <ProductList products = {this.state.limitProducts}/>
          </div>
        </div>
      </div>
    )
  }
}


export default BasicProductsAll;
