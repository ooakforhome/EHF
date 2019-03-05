import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import addCartImg from "../../../styles/image/add-shopping-cart.png"

const MemberHeader =({showProfileBlock, onclick_logout, amountInCart})=>(
  <div className="col-12 inline_block">
    <div className="fLeft">
      <button onClick={showProfileBlock}>
        Profile Update
      </button>
    </div>
    <div className="fLeft">
      <button onClick={onclick_logout}>
        LOGOUT
      </button>
    </div>
    <div className="fLeft cart-container">
      <Link to="/cart">
        <img className="imgforcart" src={addCartImg} />
        <p className="showLocalAmount"><b>{amountInCart}</b></p>
      </Link>
    </div>
  </div>
)


export default MemberHeader;


// import React, { Component } from 'react';
// import API from '../api_helper'
// // Parts
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Logout from './Logout';
// // import CartItem from './cartItem';
//
// class MemberHeader extends Component {
//   constructor(props){
//     super(props);
//     this.state={
//       amountInCart: 0
//     }
//   }
//
//   componentDidMount(){
//     this.getCart();
//   }
//
//   getCart() {
//     const token = JSON.parse(localStorage.getItem('the_main_app')).token;
//     axios.get(`/api/user/useraddtocart?_id=${token}`)
//       .then(inCart => {
//         this.setState({amountInCart: inCart.data.length})
//       })
//   }
//
//   onclick_logout(e){
//     e.preventDefault();
//     const token = JSON.parse(localStorage.getItem('the_main_app')).token
//
//     API.memberLogout(token)
//       .then( respond => {
//         if(respond.data.success === false){
//           alert("logout unsuccessful");
//         } else {
//           window.location = '/';
//         }
//       })
//   };
//
//   showProfileBlock(){
//     document.querySelector(".memberProfileBlock").classList.toggle("hide")
//   }
//
//   render(){
//     return(
//       <>
//         <div className="col-12 inline_block">
//           <div className="fLeft"><button onClick={this.showProfileBlock.bind(this)}>Profile Update</button></div>
//           <div className="fLeft">
//             <button onClick={this.onclick_logout.bind(this)}>
//               LOGOUT
//             </button>
//           </div>
//           <div className="fLeft cart-container">
//             <Link to="/cart">
//               <img className="imgforcart" src="https://img.icons8.com/windows/1600/add-shopping-cart.png" />
//               <p className="showLocalAmount"><b>{this.state.amountInCart}</b></p>
//             </Link>
//           </div>
//         </div>
//       </>
//     )
//   }
// }
//
// export default MemberHeader;
