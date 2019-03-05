import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import { setInStorage, getFromStorage } from '../utils/storage';
import './core.scss'

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
      const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
        const { token } = obj;
        // Verify token
        fetch('/api/user/verify?token=' + token)
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              this.setState({
                token,
                isLoading: false
              });
              window.location =`/auth/products`;
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


  onTextboxChangeSignInEmail(e){
    this.setState({
     signInEmail: e.target.value,
    })
  }
  onTextboxChangeSignInPassword(e){
    this.setState({
     signInPassword: e.target.value,
    })
  }
  onTextboxChangeSignUpEmail(e){
    this.setState({
     signUpEmail: e.target.value,
    })
  }
  onTextboxChangeSignUpPassword(e){
    this.setState({
     signUpPassword: e.target.value,
    })
  }

  onSignUp() {
      // Grab state
    const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if(emailCheck.test(this.state.signUpEmail) === false){
      alert("Please input correct email format")
    } else if(this.state.signUpPassword.length < 8){
      alert("Your password have to be more than 8 characters")
    } else {
      const { signUpEmail, signUpPassword } = this.state;
      this.setState({
        isLoading: true,
      });
      // Post request to backend
      fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signUpEmail,
          password: signUpPassword,
        }),
      })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });
    }
  }

  onSignIn() {
      // Grab state
      const {
        signInEmail,
        signInPassword,
      } = this.state;
      this.setState({
        isLoading: true,
      });
      // Post request to backend
      fetch('/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,
        }),
      }).then(res => res.json())
        .then(json => {
          if (json.success) {
            setInStorage('the_main_app', { token: json.token });
            this.setState({
              signInError: json.message,
              isLoading: false,
              signInPassword: '',
              signInEmail: '',
              token: json.token,
            })
            window.location =`/auth/products/`;
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    }

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
              <form onSubmit={this.onSignIn.bind(this)} autoComplete="off">
              <div className="sign_In_Box">
                {
                  (signInError) ? (
                    <p>{signInError}</p>
                  ) : (null)
                }
                <p className="text-center"><b>Sign In</b></p>
                <div className="inputBox">
                <input
                  className="input-value"
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  value={signInEmail}
                  onChange={this.onTextboxChangeSignInEmail.bind(this)}
                />
                </div>
                <br />
                <div className="inputBox">
                <input
                  className="input-value"
                  type="password"
                  autoComplete="off"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={this.onTextboxChangeSignInPassword.bind(this)}
                />
                </div>
                <br />
                <button className="sign-in-btn" type="submit">Sign In</button>
              </div>
              </form>

              <br />
              <br />
              <p>dont have a account?</p>
              <button className="sign_up_btn" onClick={this.showSignup.bind(this)}>create account</button>

              {/*<div className="sign_up_container toggleContainer box_shadow">*/}
              <form onSubmit={this.onSignUp.bind(this)} autoComplete="off">
              <div className={(this.state.signupActive)?"sign_up_container box_shadow": "sign_up_container box_shadow hide"}>
                {
                  (signUpError) ? (
                    <p>{signUpError}</p>
                  ) : (null)
                }
                <p className="text-center">Sign Up</p>
                <input
                  className="col-11 input-space"
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={this.onTextboxChangeSignUpEmail.bind(this)}
                />
                <br />
                <input
                  className="col-11 input-space"
                  type="password"
                  autoComplete="off"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={this.onTextboxChangeSignUpPassword.bind(this)}
                />
                <br />
                <button type="submit">Sign Up</button>
              </div>
              </form>
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
