import React, { Component } from 'react';
import axios from 'axios';
import '../style.scss';

class AdminOrdersPage extends Component {
  constructor(props){
    super(props);
    this.state={
      token: localStorage.getItem('admin_token'),
      allOrders: []
    }
  }

  componentWillMount(){
    this.allOrders()
  }

  allOrders(){
    axios.get('/api/findallorders')
      .then(res=>{
        this.setState({
          allOrders: res.data
        })
      })
  }


  render(){
    if(!this.state.allOrders){
      <h1>hold on</h1>
    }

    // console.log(this.state.allOrders)

    const AllOrders = (
      <table>
        <tbody>
          <tr className="col-12">
            <th className="">Order</th>
            <th className="">Date</th>
            <th className="">Customer</th>
            <th className="">Payment Status</th>
            <th className="">Fullfill Status</th>
            <th className="">Total</th>
          </tr>
          {
            this.state.allOrders.map((order, i)=>{
              let total = 0;
              order.products.forEach(product=>{
                total += (product.purchase_price * product.quantity )
              })
              const createdDate = order.created.split('').splice(0,10);
              return(
                <tr key={i}>
                  <td className="">{order._id}</td>
                  <td className="">{createdDate}</td>
                  <td className="">{order.customer_name}</td>
                  <td className="">{order.payment_status}</td>
                  <td className="">Completed</td>
                  <td className="">{(!total)?"NaN":total}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )

    return(
      <>
        <button
          onClick={()=> this.props.history.push(`/adminhome/${this.state.token}`)}>
          back
        </button>
        {AllOrders}
      </>
    )
  }
}

export default AdminOrdersPage;
