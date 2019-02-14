import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Header } from '../core/Header';
import { ProductsBox } from './parts/ProductsBox';
import Categories from '../componentParts/Categories';
import API from './api-basic';



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
    };
  }

// mount Redux data info.
  componentWillMount() {
    this.loadDatas();
  }

  loadDatas(){
    const {limit, offset, Category_type} = this.state;
    API.loadProducts({category_type: Category_type, limit: limit, offset:offset})
    .then(info => {
      this.setState({
        products: info.data.all,
        count: info.data.count
      })
    })
  }

  // Categories link
    handleClickthenav(e){
      e.preventDefault();
      const theName = e.target.id; // query need + in between space
      API.loadProducts({category_type: theName, limit: 10, offset: 0})
      .then(info => {
        this.setState({
          products: info.data.all,
          count: info.data.count,
          Category_type: theName,
          limit: 10,
          offset: 0
        })
      })
    };

  handleClick(e){
      e.preventDefault();
        window.location =`/product/${e.target.value}`;
  }

  handleDelete(e){
    e.preventDefault();
    API.deleteProduct(e.target.value)
      window.location.reload();
  }

  nexthandleChange(){
      const totalOffset = Math.floor(this.state.count/this.state.limit);
      const nextOffset = this.state.offset + 1
      const {limit, offset, Category_type} = this.state;

      if(this.state.offset >= totalOffset){
        API.loadProducts({category_type: Category_type, limit: limit, offset:totalOffset})
        .then(info => {
          this.setState({
            offset: totalOffset,
            products: info.data.all,
            count: info.data.count
          })
        })
      } else {
        API.loadProducts({category_type: Category_type, limit: limit, offset:nextOffset})
        .then(info => {
          this.setState({
            offset: nextOffset,
            products: info.data.all,
            count: info.data.count
          })
        })
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
    this.loadDatas()
  };

  searchBoxValue(e){
    e.preventDefault();
    const searchValue = e.target.value;
    const {offset, limit} = this.state;

    API.searchBox({
      searchValue, offset, limit
    })
    .then(info => {
      this.setState({
        products: info.data.all,
        count: info.data.count
      })
    })
  }

  render(){
    if(!this.state.products){
      return "waiting for data";
    }

    const ProductList = ({products}) => (
      <div>
        {products.map((product, i) =>
          <ProductsBox key={i}
                  {...product}
                  handleClick={this.handleClick.bind(this)}
                  handleDelete={this.handleDelete.bind(this)}
                  />
        )}
      </div>
    )


    const TotalPages = Math.ceil(this.state.count/this.state.limit);
    const CurrentPage = this.state.offset + 1;
    const PageBtn=()=>(
      <div className ="floatleftblock">
        <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
        <p>Page: { CurrentPage } of { TotalPages }</p>
        <p>Total: {this.state.count}</p>
        <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
      </div>
    )

    return(
      <div>
        <Header />
        <div className="category_nav">
          <Categories clickthenav = { this.handleClickthenav.bind(this) } />
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
          <ProductList products = {this.state.products}/>
          </div>
        </div>
      </div>
    )
  }
}


export default BasicProductsAll;
