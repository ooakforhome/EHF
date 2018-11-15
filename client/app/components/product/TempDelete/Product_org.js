import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderCount, fetchProducts, renderPerPage, searchSku, searchProduct } from '../../actions/product-action';
import { ProductsBox } from './parts/ProductsBox';
import Categories from './Categories';
import API from './api-product';
import { Link } from 'react-router-dom';

class ProductsAll extends Component {
  constructor(props){
    super(props);
    this.state = {
      limit: 10,
      offset: 0,
      Category_type: "ALL"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // Mount Redux data
  componentWillMount(){
    this.props.fetchProducts({ limit: this.state.limit, offset: this.state.offset});
  }

  // ProductBox Clicks
  handleClick(e){
      e.preventDefault();
        window.location =`/product/${e.target.value}`;
  }

  handleDelete(e){
    e.preventDefault();
    API.deleteProduct(e.target.value)
      window.location.reload();
  }

  // Categories link
  handleClickthenav(e){
    e.preventDefault();
    const theName = e.target.id.split(' ').join('+'); // query need + in between space
    this.setState({
      Category_type: e.target.id
    })
    // category data
    this.props.renderPerPage({
      limit: this.state.limit,
      offset: this.state.offset,
      Category_type: theName
    })
    // category count
    this.props.renderCount({
      limit: this.state.limit,
      offset: this.state.offset,
      Category_type: theName
    })
  };

  // Previous Offset
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

  // Next Offset
  nexthandleChange(e){
    e.preventDefault();
    if((this.state.offset* this.state.limit) <= (this.props.rendercount+this.state.limit-1)){
      this.setState({
        limit: 10,
        offset: this.state.offset+=1
      })
    } else {
      this.setState({
        limit: 10,
        offset: this.state.offset
      })
    }
  };



  render(){
    if(!this.props.newproducts){
      return "Waiting for data";
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
          <h1>{this.state.Category_type}</h1>
          <Link to="/newproduct">
            <button>ADD PRODUCT</button>
          </Link>
          <div>
            <ProductList products = {this.props.newproducts}/>
          </div>

          <div className="floatleftblock page_offset">
            <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1">
              Prev
            </button>
            <p> {this.state.offset} </p>
            <button onClick={this.nexthandleChange.bind(this)} name="next" value="1">
              Next
            </button>
          </div> // page offset
        </div>

      </div>
    );
  }
};


const mapStateToProps = state => ({
  newproducts: state. newproducts.products,
  rendercount: state.rendercount.products,
  newproduct: state.newproducts.product,
});

export default connect(mapStateToProps, { renderCount, fetchProducts, renderPerPage, searchSku, searchProduct })(ProductsAll);
