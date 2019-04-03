import React, { Component } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';

import API from '../api-product';
import Logout from '../parts/Logout';
import Categories from '../../componentParts/Categories';

import '../style.scss'

class AdminAllProducts extends Component{
  constructor(props) {
    super(props);
    this.state = {
      token:localStorage.getItem('admin_token'),
      products:[],
      limit: 10,
      offset: 0,
      count: 0,
      category_type: "Accent Furnitures",
      updateInventory: {}
    }
  }

  componentDidMount(){
    this.loadProducts()
  }

  loadProducts(){
    const { category_type } = this.state;
    axios.get(`/api/products/${category_type}`)
      .then(products => {
        this.setState({
          products: products.data
        })
      })
  }

// Logout Admin
  onclick_logout(e){
    e.preventDefault();
    // console.log(i)
    API.adminLogout( this.state.token )
    .then( respond => {
      if(respond.data.success === false){
        alert("logout unsuccessful");
      } else {
        localStorage.clear('admin_token')
        this.props.history.push('/');
      }
    })
  };


  availableProductOnChange(e){
    let select = e.target.getAttribute("data-id");
    let key = e.target.getAttribute("data-name");
    let value = e.target.value;

    this.setState(prevState => ({
      updateInventory: {
        ...prevState.updateInventory,
        [select] : {
          ...prevState.updateInventory[select],
          [key] : value
        }
      }
    }))
  }

  updateAllInventory(e){
    e.preventDefault();
    const { updateInventory } = this.state;
    axios.put(`/api/updatemanyproducts`, updateInventory)
      .then(res => {
        if(res.status === 200){
          const { category_type } = this.state;
          axios.get(`/api/products/${category_type}`)
            .then(products => {
              this.setState(prevState =>({
                ...prevState,
                products: products.data
              }))
            })
        } else {
          console.log("Update All Inventory error")
        }
      })
  }

  productEdit(id){
    this.props.history.push(`/admin/products/${id}`)
  }

  // Categories Component
    handleClickthenav(e){
      e.preventDefault();
      // console.log(e.target.id)
      this.setState({
        menuActive: !this.state.menuActive,
        limit: 10,
        offset: 0,
        category_type: e.target.id
      }, ()=>{
        this.loadProducts()
      })
    };

    categorybutton(){
      this.setState({
        menuActive: !this.state.menuActive
      })
    }

  render(){
    if(!this.state.products){
      console.log("loading")
    }


    const AdminProductBox = (
      <table>
        <tbody>
          <tr className="col-12">
            <th className="">image</th>
            <th className="">SKU</th>
            <th className="">Product Name</th>
            <th className="">Available
                <button onClick={this.updateAllInventory.bind(this)}>
                  Update All
                </button>
              </th>
            <th className="">Retail Price</th>
            <th className=""></th>
          </tr>
        {
          this.state.products.map((product, i) =>{
            return(
              <tr key={i}>
                <td className="">
                  <img
                    style={{width: '50px', height: '50px'}}
                    src={`/api/imagesm/${product.images}`} />
                </td>
                <td className="">{product.SKU}</td>
                <td className="">{product.Product_Name}</td>
                <td className="">
                  <input
                    type="text"
                    data-id= {product._id}
                    data-position = {i}
                    data-name="Inventory"
                    onChange={this.availableProductOnChange.bind(this)}
                    />
                  <span>:Current Available <b>{(product.Inventory)? product.Inventory: 0}</b></span>
                </td>
                <td className="">{product.Retail}</td>
                <td className=""><button onClick={this.productEdit.bind(this, product._id)}>Edit</button></td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    )

    return(
      <>
        <div>
          <Logout onclick_logout = {this.onclick_logout.bind(this)} />
          <button
            onClick={()=> this.props.history.push(`/adminhome/${this.state.token}`)}>
            back
          </button>
        </div>
        <div>
          <Categories
            clickthenav = { this.handleClickthenav.bind(this) }
            categorybutton = { this.categorybutton.bind(this) }
            menuActive = {this.state.menuActive}
          />
        </div>
        <div>
          {AdminProductBox}
        </div>
      </>
    )
  }
}

export default AdminAllProducts;
