import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { renderMember } from '../../actions/member-action';
import Categories from '../componentParts/Categories';
import { ProductsBox } from './parts/ProductsBox';
import Logout from './parts/Logout';
import { setInStorage, getFromStorage } from '../utils/storage';

import cart from '../cart/cart-helper';

//SPD to Products
class MemberProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      offset: 0,
      count: 0,
      token:'',
      Category_type: "Accent Furnitures"
    };
  }

// mount Redux data info.
  componentWillMount() {
    this.checkValidation();
  }

  checkValidation(){
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      fetch('/api/user/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
            this.loadDatas();
          } else {
            window.location =`/`;
          }
        });
    } else {
        window.location =`/`;
    }
  }


  loadDatas(){
    const {limit, offset} = this.state;
    const theName = this.state.Category_type.split(' ').join('+');
    this.props.renderMember({
      limit: limit,
      offset: offset,
      Category_type: theName
    });
  }

  // Categories link
  handleClickthenav(e){
    e.preventDefault();
    const theName = e.target.id.split(' ').join('+'); // query need + in between space
    this.setState({
      limit: 10,
      offset: 0,
      Category_type: e.target.id
    })
    this.props.renderMember({limit: 10, offset: 0, Category_type:theName})
  };

// ProductsBox
  handleClick(e){
    e.preventDefault();
      window.location =`/auth/product/${e.target.value}`;
  }

  nexthandleChange(){
    const totalOffset = Math.floor(this.props.newproducts.count/10);
    const {limit, offset} = this.state;
    let theName = this.state.Category_type.split(' ').join('+');


    if(this.state.offset >= totalOffset){
      this.props.renderMember({limit: limit, offset: offset, Category_type:theName})
      this.setState({ offset: totalOffset })
    } else {
      this.props.renderMember({limit: limit, offset: offset+1, Category_type:theName})
      this.setState({ offset: this.state.offset+=1 })
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
    this.updates();
  };

  updates(){
    const theName = this.state.Category_type.split(' ').join('+'); // query need + in between space
    this.props.renderMember({Category_type: theName, limit: this.state.limit, offset: this.state.offset});
  };

  onclick_logout(e){
    e.preventDefault();
    axios.get(`/api/user/logout?token=${this.state.token}`)
    .then( respond => {
      if(respond.data.success === false){
        alert("logout unsuccessful");
      } else {
        window.location = '/';
      }
    })
  };

  addToCart(e){
    e.preventDefault();
    const theId = e.target.value;
    axios.get(`/api/product/${theId}`)
      .then(item => {
        cart.addItem(item.data,()=>{
          console.log("item add to cart")
        })
      })
  }

  render() {
    if(!this.props.newproducts.all){
      return "waiting for data";
    }

    const TotalPages = Math.floor(this.props.newproducts.count/10);
    const ProductList = ({products}) => (
      <div>
        {products.map((product, i) =>
          <ProductsBox key={i}
                  {...product}
                  handleClick={this.handleClick.bind(this)}
                  addToCart={this.addToCart.bind(this)}
                  />
        )}
      </div>
    )



    return(
      <div>
        <div>
          <Logout
            onclick_logout = {this.onclick_logout.bind(this)}
          />
        </div>
        <div className="category_nav">
          < Categories clickthenav = { this.handleClickthenav.bind(this) } />
        </div>
        <div className="products_box">
          <h1>{this.state.Category_type}</h1>

            <div className ="floatleftblock">
              <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
              <p>Page: {this.state.offset} of { TotalPages }</p>
              <p>Total: {this.props.newproducts.count}</p>
              <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
            </div>

          <div>
            <ProductList products = {this.props.newproducts.all}/>
          </div>
          <div className ="floatleftblock">
            <button onClick={this.prevhandleChange.bind(this)} name="prev" value="1" >Prev</button>
              <p>Page: {this.state.offset} of { TotalPages }</p>
            <button onClick={this.nexthandleChange.bind(this)} name="next" value="1" >next</button>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  newproducts: state.memberproducts.products,
  newproduct  : state.memberproducts.product,
});

export default connect(mapStateToProps, { renderMember })(MemberProducts);
