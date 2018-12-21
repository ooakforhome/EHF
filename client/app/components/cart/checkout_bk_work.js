import React, { Component } from 'react';
import cart from './cart';

class Checkout extends Component {


addressChange(e){
  e.preventDefault();
  this.setState({
    [e.target.name]: e.target.value
  })
}

  render(){
    return(
      <>
        <div>
          <h2>Checkout</h2>
        </div>
        <form>
          <div>
            <label htmlFor="name"><i className="">NAME</i></label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="exp. Don Jovi"/>
          </div>
          <div>
            <label htmlFor="email"><i className="">Email</i></label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="john@example.com"/>
          </div>

          <p>ADDRESS</p>
          <div>
            <label htmlFor="street"><i className="">STREET</i></label>
            <input
              type="text"
              id="street"
              name="street"
              placeholder="exp. Don Jovi"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="city"><i className="">CITY</i></label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="john@example.com"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="state"><i className="">STATE</i></label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="exp. Don Jovi"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="zip"><i className="">ZIP CODE</i></label>
            <input
              type="text"
              id="zip"
              name="zip"
              placeholder="john@example.com"
              onChange={this.addressChange.bind(this)}/>
          </div>
          <div>
            <label htmlFor="country"><i className="">COUNTRY</i></label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="john@example.com"
              onChange={this.addressChange.bind(this)}/>
          </div>
        </form>
      </>
    )
  }

}// end class component

export default Checkout;