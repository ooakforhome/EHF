import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import axios from 'axios';

import API from './api-product';
import Logout from './parts/Logout';

class AdminHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: localStorage.getItem('admin_token')
    }
  }

  componentDidMount(){
    this.loadAllOrders()
  }

  onclick_logout(e){
    e.preventDefault();
    API.adminLogout( this.state.token )
    .then( respond => {
      if(respond.data.success === false){
        alert("logout unsuccessful");
      } else {
        localStorage.removeItem('admin_token');
        this.props.history.push('/');
      }
    })
  };

  loadAllOrders(){
    let todayorders = [];
    axios.get(`/api/findsortorders`)
      .then(orders =>
        orders.data.forEach(order=>{
          (order.fullfill_status === "Incomplete")? todayorders.push(order): "";
        })
      )

      console.log(todayorders)

    // if(todayorders.length > 0){
    //   this.setState({
    //     ordersToBeFill: todayorders
    //   })
    // } else {
    //   this.setState({
    //     ordersToBeFill: "NO NEW ORDER"
    //   })
    // }
  }

  render(){

    const ShowIncompleteOrders = (orders) =>{
        console.log("===========")
        console.log(orders)
        console.log("===========")
      return(
      <ul>
        {
          <li>{(orders.customer_name)?(orders.customer_name):this.state.ordersToBeFill}</li>
        }
      </ul>
    )}

    return(
    <div style={{backgroundColor: "#a3d0ff"}}>
      <h1>ADMIN HOME PAGE</h1>
      <Logout
        onclick_logout = {this.onclick_logout.bind(this)}
      />
      <div className="homeBody">
        <div className="links_to">
          <Link to="/admin/orders"><button>Orders</button></Link>
          <Link to="/admin/products"><button>Products</button></Link>
          <Link to="/admin/members"><button>Members</button></Link>
        </div>

        <div className="today_order">
          <ShowIncompleteOrders orders={this.state.ordersToBeFill}/>
        </div>
      </div>
    </div>
    )
  }
}

export default AdminHome;
