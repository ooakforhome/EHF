import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { setInStorage, getFromStorage } from '../utils/storage';

// Page and parts import
import { fetchOneMember } from '../../actions/member-action';
import { MemberDetailBox } from './parts/MemberDetailBox';
import cart from './cart/cart-helper';

// Begin Component
class MemberProduct extends Component {
  constructor(props){
    super(props)
        this.state = {
        product: [],
        images: '',
        token:JSON.parse(localStorage.getItem('the_main_app')).token,
        redirect: false
      }
 }

 componentWillMount() {
   const { token } = this.state
   this.props.fetchOneMember({id: this.props.match.params.id, token});
   this.checkValidation();
 }

 componentDidMount(){
   const { token } = this.state
   this.props.fetchOneMember({id: this.props.match.params.id, token});
 }

  checkValidation() {
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
          } else {
            window.location = `/`;
          }
        });
    } else {
      window.location = `/`;
    }
  }

  backToProductsPageOnClick(e){
    e.preventDefault();
    // window.location =`/auth/products/${this.state.token}`;
    window.location =`/auth/products`;
  }

  addToCart(e){
    e.preventDefault();
      const itemid = this.props.match.params.id;
        if(localStorage.cart.match(itemid)){
          alert("item already added")
        } else {
          cart.addItem(this.props.memberproduct, () => {
            alert("item added")
          });
        }
  }

  render(){
    return (
      <div className="detailPage">
        <div className="item_container" style={{visibility: 'visible'}}>
          <div className="backNav">
            <button onClick={this.backToProductsPageOnClick.bind(this)} className="backButton">BACK TO PRODUCTS PAGE</button>
          </div>
          <div className="detailPage">
            <MemberDetailBox item={this.props.memberproduct}/>
          </div>
          <button className="add_to_cart_btn" onClick={this.addToCart.bind(this)}> + </button>
        </div>
      </div>
      );
    }
  } // End Class

  const mapStateToProps = state => ({
    memberproduct: state.memberproducts.product
  });

export default connect(mapStateToProps, { fetchOneMember } ) (MemberProduct);
