import React, { Component}  from 'react';
import { Route, Link } from 'react-router-dom';
// import './core.css';

import axios from 'axios';
// import Signup from '../passport/login-form';
// import LoginForm from '../passport/sign-up';


class Home extends Component {
	constructor(props) {
    super(props);
		this.state = {
			loggedIn: false,
			username: null,
			products: "https://cdn0.iconfinder.com/data/icons/delivery-2-1/100/delivery-20-512.png",
			addImg: "https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_31-512.png"
		};
	}


	render(){
  	return(
			<div className='fp_container'>
				<div className='login_block'>
					<div className="front_button">
						<Link to="/products">
							<img alt="front product" src={this.state.products} />
							<button>PRODUCTS</button>
						</Link>
					</div>
					<div className="front_button">
						<Link to="/newproduct">
							<img alt="front add" src={this.state.addImg} />
							<button>ADD PRODUCT</button>
						</Link>
					</div>
				</div>


			</div>
		)
	}
}

export default Home;
