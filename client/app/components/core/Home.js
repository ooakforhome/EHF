import React, { Component}  from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import './core.scss';

import axios from 'axios';
// import Signup from '../passport/login-form';
// import LoginForm from '../passport/sign-up';


class Home extends Component {
	constructor(props) {
    super(props);
		this.state = {
			loggedIn: false,
			username: null,
			products: "https://cdn0.iconfinder.com/data/icons/delivery-2-1/100/delivery-20-512.png"
		};
	}


	render(){
		const bigToken =	(localStorage.the_main_app)?
		 	 (JSON.parse(localStorage.the_main_app).token): "";

  	return(
			<div className='fp_container'>
				<Header />
				<div className='login_block'>
					<div className="front_button">
						{
						(`${bigToken}`)?
						<Link to="/auth/products/">
							<img alt="front product" src={this.state.products} />
							<button>PRODUCTS</button>
						</Link>:
						<Link to="/products">
							<img alt="front product" src={this.state.products} />
							<button>PRODUCTS</button>
						</Link>
						}
					</div>
				</div>


			</div>
		)
	}
}

export default Home;
