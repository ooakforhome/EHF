import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import { setInStorage, getFromStorage } from '../utils/storage';
import './core.scss';
import axios from 'axios';
import UserRegister from './parts/UserRegister';
import UserLoginForm from './parts/UserLoginForm';


class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signupActive: false
    };
  }

  componentDidMount() {
    const token = (localStorage.the_main_app)?
      (JSON.parse(localStorage.getItem('the_main_app')).token):'';
    if(token){
      axios.get(`/api/user/verify?token=${token}`)
        .then(res => {
         return (res.data.success === true)?
          this.props.history.push(`/auth/products/`):
          "";
        })
    }

  } //end didMount

    logout() {
        this.setState({
          isLoading: true,
        });
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
          const { token } = obj;
          // Verify token
          fetch('/api/user/logout?token=' + token)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                this.setState({
                  token: '',
                  isLoading: false
                });
              } else {
                this.setState({
                  isLoading: false,
                });
              }
            });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      }

  showSignup(e){
    e.preventDefault();
      this.setState({signupActive: !this.state.signupActive})
  }

      render() {
        const { isLoading, token, signInError, signInEmail, signInPassword, signUpEmail, signUpPassword, signUpError } = this.state;
        if (!token) {
          return (
            <div className="login_page_container">
              <div className="sign_In_Box">
                {
                  (signInError) ?
                    ( <p>{signInError}</p> ) :
                    (null)
                }
                  <UserLoginForm />
              </div>

              <br />
              <br />
                <p>dont have a account?</p>
                <button
                  className="sign_up_btn" onClick={this.showSignup.bind(this)}>
                    create an account
                </button>
                <div
                  className={(this.state.signupActive)?
                    "sign_up_container box_shadow":
                    "sign_up_container box_shadow hide"}>
                  <UserRegister />
                </div>
           </div>
          );
        }
        return (
          <>
            <p>You already login</p>
            <button onClick={this.logout.bind(this)}> CLICK TO LOGOUT </button>
          </>
        );
      }

} // end HOME

export default UserLogin;
