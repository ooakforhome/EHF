import React, { Component}  from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import './core.scss';

import axios from 'axios';
// import Signup from '../passport/login-form';
// import LoginForm from '../passport/sign-up';
import "./test.scss";

class Home extends Component {
	constructor(props) {
    super(props);
		this.state = {
			loggedIn: false,
			username: null,
			products: "https://cdn0.iconfinder.com/data/icons/delivery-2-1/100/delivery-20-512.png",
			img1: "https://www.planwallpaper.com/static/images/8ccb4ec4225b290726ae9be975220ff4.jpg",
			img2: "http://files.all-free-download.com//downloadfiles/wallpapers/1920_1200/thor_space_nebula_15705.jpg",
			img3: "https://www.planwallpaper.com/static/images/8ccb4ec4225b290726ae9be975220ff4.jpg"
		};
	}


	render(){
  	return(
			<div className="col-12">
				<img src={this.state.img1} />
				<img className="floatitup" src={this.state.img2} />
				<img className="floatitup" src={this.state.img3} />
			</div>
		)
	}
}

export default Home;
