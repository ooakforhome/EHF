import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchProducts, searchSku, searchProduct } from '../../actions/product-action';
import { ProductsBox } from './parts/ProductsBox';
import Categories from './Categories';
import API from './api-product';
import { Link } from 'react-router-dom';
// import './product.css';

//SPD to Products
class ProductsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      offset: 0
    };
    this.handleChange=this.handleChange.bind(this);
  }

// mount Redux data info.
  componentWillMount() {
    this.props.fetchProducts({limit: this.state.limit, offset: this.state.offset});
  }


  handleClick(e){
      e.preventDefault();
        window.location =`/product/${e.target.value}`;
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
    const theName = e.target.id.split(' ').join(' ');
    console.log(theName)
    window.location = `/products/by/${e.target.id}`;
  };

  // Limit per page
  handleChange(e){
    e.preventDefault();
      this.props.fetchProducts({limit: e.target.value});
  };

  nexthandleChange(e){
    e.preventDefault();
      this.setState({
        limit: 10,
        offset: this.state.offset+=1
      })
      this.updates();
      console.log(this.state.offset);
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
      console.log(this.state.offset);
  };

  updates(){
    this.props.fetchProducts({limit: this.state.limit, offset: this.state.offset});
  };


  render() {
    if(!this.props.newproducts){
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
          <h1>Products ALL</h1>
          <Link to="/newproduct">
            <button>ADD PRODUCT</button>
          </Link>
            <button onClick={this.handleChange} name="limit" value="">ALL</button>
            <button onClick={this.handleChange} name="limit" value="10">10</button>
            <button onClick={this.handleChange} name="limit" value="20">20</button>
            <button onClick={this.handleChange} name="limit" value="30">30</button>

            <div className ="floatleftblock">
              <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
              <p>current page{this.state.offset}</p>
              <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
            </div>

          <div>
            <ProductList products = {this.props.newproducts}/>
          </div>
          <div className ="floatleftblock">
            <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
            <p>current page{this.state.offset}</p>
            <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  newproducts: state.newproducts.products,
  newproduct: state.newproducts.product,
});

export default connect(mapStateToProps, { fetchProducts, searchSku, searchProduct })(ProductsAll);
