import React, { Component } from "react";
import { ProductsBox } from './parts/ProductsBox';
import Categories from './Categories';
import API from './api-product';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import './product.css';

//SPD to Products
class ProductsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsInfo: [],
      limit: 10,
      offset: 0,
      count: 0,
      Category_type: "Accent Furnitures"
    };
    this.handleChange=this.handleChange.bind(this);
  }

// mount Redux data info.
  componentWillMount() {
    this.loadDatas();
  }

  loadDatas(){
    const {limit, offset} = this.state;
    const theName = this.state.Category_type.split(' ').join('+');

    axios.get(`/api/allproducts/search?limit=${limit}&offset${offset}&Category_type=${theName}`).then(item => {
      this.setState({
        itemsInfo: item.data
      })
    });
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

  // Categories link
  handleClickthenav(e){
    e.preventDefault();
    const theName = e.target.id.split(' ').join('+'); // query need + in between space
    this.setState({
      Category_type: e.target.id
    })
    this.loadDatas();
  };

  // Limit per page
  handleChange(e){
    e.preventDefault();
      this.props.renderPerPage({limit: e.target.value});
  };

  nexthandleChange(e){
    e.preventDefault();
      this.setState({
        limit: 10,
        offset: this.state.offset+=1
      })
      this.loadDatas(){();
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
    this.loadDatas(){();
  };

  // updates(){
  //   const theName = this.state.Category_type.split(' ').join('+');
  //   this.props.renderPerPage({Category_type: theName, limit: this.state.limit, offset: this.state.offset});
  // };


  render() {
    if(!this.state.itemsInfo.all){
      return "waiting for data";
    }
    console.log("===========itemsInfo==================")
    console.log(this.state.itemsInfo)
    console.log("===========itemsInfo==================")
    console.log(this.state.itemsInfo.count)
    console.log("===========itemsInfo==================")
    console.log(this.state.itemsInfo.all)

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

            <div className ="floatleftblock">
              <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
              <p>current page{this.state.offset}</p>
              <p>{this.state.itemsInfo.count}</p>
              <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
            </div>

          <div>
            <ProductList products = {this.state.itemsInfo.all}/>
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


export default ProductsAll;
