import React, { Component } from "react";
import { connect } from 'react-redux';
import { renderPerPage }  from '../../actions/product-action';
import { ProductsBox } from './parts/ProductsBox';
import Categories from './Categories';
import API from './api-product';
// import './product.css';

class ProductsByCategory extends Component {
  constructor(props) {
  super(props)
  this.state = {
    limit: 10,
    offset: 0,
    Category_type: "Bath+Hardwares"
  }
}


  componentDidMount(){
    this.props.renderPerPage({
      limit: this.state.limit,
      offset: this.state.offset,
      Category_type: this.state.Category_type
    });
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
  const theName = e.target.id.split(' ').join('+');
  console.log(theName)
  window.location = '/products/by/'+theName;
  }

  render() {
    if(!this.props.newproducts){
      return "waiting for data";
    }
      console.log(this.props.Category_type);
      console.log(this.props.newproducts);
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
        <h1>{this.state.Category_type}</h1>
        < Categories clickthenav = { this.handleClickthenav.bind(this) } />
        </div>
        <div className="products_box">
          <h1>Products Category</h1>
          <div>
            <ProductList products = {this.props.newproducts}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newproducts: state.newproducts.products
});

export default connect(mapStateToProps, { renderPerPage })(ProductsByCategory);
