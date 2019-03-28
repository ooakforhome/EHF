import React, { Component } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';

import API from '../api-product';
import Logout from '../parts/Logout';

class AdminAllProducts extends Component{
  constructor(props) {
    super(props);
    this.state = {
      token:localStorage.getItem('admin_token'),
      products:[],
      limit: 10,
      offset: 0,
      count: 0,
      category_type: "Accent Furnitures"
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
    // let position = e.target.getAttribute("data-position");
    let key = e.target.getAttribute("data-name");
    let value = e.target.value;
    // console.log(position)
    console.log(key +" : "+ value)
  }

  productEdit(id){
    this.props.history.push(`/admin/products/${id}`)
  }


  render(){
    if(!this.state.products){
      console.log("loading")
    }
    console.log(this.state.products)

    const AdminProductBox = (
      <table>
        <tbody>
          <tr className="col-12">
            <th className="">image</th>
            <th className="">SKU</th>
            <th className="">Product Name</th>
            <th className="">Available</th>
            <th className="">Retail Price</th>
            <th className=""></th>
          </tr>
        {
          this.state.products.map((product, i) =>{
            return(
              <tr key={i}>
                <td className=""><img style={{width: '50px', height: '50px'}} src={`/api/imagesm/${product.images}`} /></td>
                <td className="">{product.SKU}</td>
                <td className="">{product.Product_Name}</td>
                <td className="">
                  <input
                    type="text"
                    id = {i}
                    data-name="Inventory"
                    // value = {this.state.value}
                    onChange={this.availableProductOnChange.bind(this, i)}
                    />
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
        <Logout onclick_logout = {this.onclick_logout.bind(this)} />
        <div>
          {AdminProductBox}
        </div>
      </>
    )
  }
}

export default AdminAllProducts;
