import React, { Component } from "react";
import { ProductsBox } from './parts/ProductsBox';
import Categories from './Categories';
import API from './api-product';
// import './product.css';

class ProductsByCategory extends Component {
  constructor(props) {
  super(props)
  this.state = {
    catproducts: [],
  }
}

// To Do Begin ==============================================

  // add redux in this page to load all products

  // pagination to all related pages

// To Do End ================================================

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    API.getCategory(this.props.match.params.Category_type)
      .then( res => {
        this.setState({
          catproducts: res.data
        })
      })
  }

  handleClick(e){
      e.preventDefault();
        window.location ='/product/'+ e.target.value;
  }

  handleDelete(e){
    console.log("-----------------------");
    console.log(e.target.value);
    console.log("-----------------------");
    e.preventDefault();
    API.deleteProduct(e.target.value)
      window.location.reload();
  }

  // Categories link
  handleClickthenav(e){
  e.preventDefault();
  const theName = e.target.id.split(' ').join('%20');
  console.log(theName)
  window.location = '/products/by/'+theName;
  }

  render() {
    if(!this.state.catproducts){
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

    return(
      <div>
        <div className="category_nav">
        < Categories clickthenav = { this.handleClickthenav.bind(this) } />
        </div>
        <div className="products_box">
          <h1>Products Category</h1>
          <div>
            <ProductList products = {this.state.catproducts}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsByCategory;
