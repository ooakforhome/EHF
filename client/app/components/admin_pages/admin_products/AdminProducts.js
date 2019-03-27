import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API from '../api-product';

import { renderAdmin, searchBoxAdmin } from '../../../actions/admin-action';
import Categories from '../../componentParts/Categories';

import { setInStorage, getFromStorage } from '../../utils/storage';
import { ProductsBox } from '../parts/ProductsBox';
import Logout from '../parts/Logout';


//SPD to Products
class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountInCart: 0,
      itemsInCart: [],
      limit: 10,
      offset: 0,
      count: 0,
      token:localStorage.getItem('admin_token'),
      Category_type: "Accent Furnitures",
      menuActive: false
    }
  }

// mount Redux data info.
  componentWillMount() {
    this.checkValidation();
  }

  checkValidation(){
    const { token } = this.state;
    axios.get(`/api/admin/verify?token=${token}`)
      .then(json => {
        if (json.data.success) {
          this.setState({
            isLoading: false
          });
          this.loadDatas();
        } else {
          this.props.history.push('/')
        }
      });
  }

  loadDatasAxios(){
    const {token, limit, offset, Category_type} = this.state;
    axios.get(`/api/admin/products?token=${token}&limit=${limit}&offset=${offset}&Category_type=${Category_type}`)
     .then(res => {
       this.setState({
         currentProducts: res.data.all
       })
     })
  }

  loadDatas(){
    const {limit, token, offset} = this.state;
    const theName = this.state.Category_type.split(' ').join('+'); // query need + in between space
    this.props.renderAdmin({
      token,
      limit,
      offset,
      Category_type: theName
    });
  }

  handleClick(e){
      e.preventDefault();
        this.props.history.push(`/admin/products/${e.target.value}`);
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
      menuActive: !this.state.menuActive,
      limit: 10,
      offset: 0,
      Category_type: e.target.id
    })
    this.props.renderAdmin({token:this.state.token, limit: 10, offset: 0, Category_type:theName})
  };


  nexthandleChange(){
      const totalOffset = Math.floor(this.props.adminproducts.count/10);
      const {limit, offset, token} = this.state;
      let theName = this.state.Category_type.split(' ').join('+');

      if(this.state.offset >= totalOffset){
        this.props.renderAdmin({token, limit, offset, Category_type:theName})
          this.setState({offset: totalOffset})
      } else {
        this.props.renderAdmin({token , limit, offset: offset+1, Category_type:theName})
          this.setState({offset: this.state.offset+=1})
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

// Logout Admin
  onclick_logout(e){
    e.preventDefault();
    API.adminLogout( this.state.token )
    .then( respond => {
      if(respond.data.success === false){
        alert("logout unsuccessful");
      } else {
        localStorage.clear('admin_token')
        window.location="/";
      }
    })
  };

// add new product
  addNewProduct(e){
    e.preventDefault();
    window.location=`/admin/newproduct`
  }

  categorybutton(){
    this.setState({
      menuActive: !this.state.menuActive
    })
  }
  // Search Input
    searchBoxValue(e){
      e.preventDefault();
      const { token } = this.state;
      this.props.searchBoxAdmin({searchValue: e.target.value, token})
      // this.setState({
      //   searchBox: e.target.value
      // })
    }

  render() {

    if(!this.props.adminproducts.all){
      return "waiting for data";
    }


    const TotalPages = Math.ceil(this.props .adminproducts.count/10);
    const CurrentPage = this.state.offset + 1;
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
    const PageBtn = () => (
      <div className ="floatleftblock text-center">
        <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
        <p>Page: { CurrentPage } of { TotalPages }</p>
        <p>Total: {this.props.adminproducts.count}</p>
        <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
      </div>
    )
    return(
      <>
        <button
          onClick={()=> this.props.history.push(`/adminhome/${this.state.token}`)}>
          back
        </button>
        <div className="admin_products_container">
          <Logout
            onclick_logout = {this.onclick_logout.bind(this)}
          />
          <button onClick={this.addNewProduct.bind(this)}>ADD NEW PRODUCT</button>
        </div>
        <div className="category_nav">
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
        <div className="products_box">
          <h1>{this.state.Category_type}</h1>
            <PageBtn />
          <div>
            <ProductList products = {this.props.adminproducts.all}/>
          </div>
            <PageBtn />
        </div>
      </>
    );
  }
}


const mapStateToProps = state => ({
  adminproducts: state.adminproducts.products
});

export default connect(mapStateToProps, { renderAdmin, searchBoxAdmin })(AdminProducts);
