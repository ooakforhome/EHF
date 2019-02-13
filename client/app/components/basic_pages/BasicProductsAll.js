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
      Category_type: "Bathroom Furnitures",
      products: [],
      limitProducts: [],
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

    API.loadProducts({category_type: Category_type})
    .then(info => {
      this.setState({
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
      API.loadProducts({category_type: theName, limit: 10, offset: 0})
      .then(info => {
        this.setState({
          products: info.data.all,
          count: info.data.count,
          limitProducts: info.data.all.slice(0, 10),
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
        count: info.data.count
      })
    })
  }

  testclick(id){
    console.log(id)
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
                  key={i}
                  {...product}
                  handleClick={this.handleClick.bind(this)}
                  testclick={this.testclick.bind(this, product._id)}
                  />
            )}
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
          <ProductList products = {this.state.limitProducts}/>
          </div>
        </div>
      </div>
    )
  }
}


export default BasicProductsAll;
