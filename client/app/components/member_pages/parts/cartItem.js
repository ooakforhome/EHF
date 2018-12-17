import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class CartItem extends Component{

  componentDidMount(){
    this.showinfo();
  }

  componentDidUpdate(){
    this.showinfo();
  }


  showinfo(){
    let inLocal
      if(localStorage.getItem('cart')){
        inLocal = JSON.parse(localStorage.getItem('cart')).length;
        return document.querySelector('.showLocalAmount').textContent= inLocal;
      }
      return 0;
  }

  render(){

    return(
      <>
        <div className="cart-container">
          <Link to="/cart">
            <img className="imgforcart" src="https://img.icons8.com/windows/1600/add-shopping-cart.png" />
            <p className="showLocalAmount"><b>0</b></p>
          </Link>
        </div>
      </>
    )
  }
}

export default CartItem;
