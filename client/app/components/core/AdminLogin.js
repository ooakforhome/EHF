import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import { setInStorage, getFromStorage } from '../utils/storage';
import './core.scss'
import axios from 'axios';

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
    };
  }

  componentDidMount() {
    const token = (localStorage.admin_token)?
      (JSON.parse(localStorage.getItem('admin_token')).token):'';

    if(token){
      axios.get(`/api/admin/verify?token=${token}`)
        .then(res => {
         return (res.data.success === true)?
          this.props.history.push(`/adminhome/${token}`):
          "";
        })
    }
  } //end didMount


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
      const { signUpEmail, signUpPassword } = this.state;
      this.setState({
        isLoading: true,
      });
      // Post request to backend
      axios.post('/api/admin/signup', {
        email: signUpEmail,
        password: signUpPassword
      })
        .then(json => {
          if (json.data.success) {
            this.setState({
              signUpError: json.message,
              isLoading: false,
              signUpEmail: '',
              signUpPassword: '',
            });
          } else {
            this.setState({
              signUpError: json.message,
              isLoading: false,
            });
          }
        });
  }

  onSignIn() {
      // Grab state
      const { signInEmail, signInPassword } = this.state;
      this.setState({ isLoading: true });
      // Post request to backend
      axios.post('/api/admin/signin', {
        email: signInEmail,
        password: signInPassword
      })
        .then(json => {
          console.log(json)
          if (json.data.success) {
            setInStorage('admin_token', json.data.token);
            this.props.history.push(`/adminhome/${json.data.token}`)
          } else {
            this.setState({
              signInError: json.message,
              isLoading: false,
            });
          }
        });
    }

    logout() {
        this.setState({
          isLoading: true,
        });
        const obj = getFromStorage('admin_token');
        if (obj && obj.token) {
          const { token } = obj;
          // Verify token
          axios(`/api/admin/logout?token=${token}`)
            .then(json => {
              if (json.data.success) {
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
    }//end logout


    showSignup(e){
      e.preventDefault();
        const toggleshow = document.querySelector('.sign_up_container');
        toggleshow.classList.toggle('toggleContainer');
    }

      render() {
        const { isLoading, token, signInError, signInEmail, signInPassword, signUpEmail, signUpPassword, signUpError } = this.state;

        if (isLoading) {
          return (<div><p>Loading...</p></div>);
        }

        if (!token) {
          return (
            <div className="login_page_container">

              <form onSubmit={this.onSignIn.bind(this)} autoComplete="off">
              <div className="sign_In_Box box_shadow">
                {
                  (signInError) ? (
                    <p>{signInError}</p>
                  ) : (null)
                }
                <p className="text-center">Sign In</p>
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
                <button type="submit">Sign In</button>
              </div>
              </form>
    {/*---------------------Create Admin-------------------------*/}
              <p>dont have a account?</p>
              <button className="sign_up_btn" onClick={this.showSignup.bind(this)}>create account</button>
              <form onSubmit={this.onSignUp.bind(this)}>
              <div className="sign_up_container toggleContainer box_shadow">
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

    {/*-------------e-----------Create Admin------------e-------------*/}

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

export default AdminLogin;
// <br />
// <br />
// <p>dont have a account?</p>
// <button className="sign_up_btn" onClick={this.showSignup.bind(this)}>create account</button>
// <form autoComplete="off">
// <div className="sign_up_container toggleContainer box_shadow">
//   {
//     (signUpError) ? (
//       <p>{signUpError}</p>
//     ) : (null)
//   }
//   <p className="text-center">Sign Up</p>
//   <input
//     className="col-11 input-space"
//     type="email"
//     autoComplete="off"
//     placeholder="Email"
//     value={signUpEmail}
//     onChange={this.onTextboxChangeSignUpEmail.bind(this)}
//   />
//   <br />
//   <input
//     className="col-11 input-space"
//     type="password"
//     autoComplete="off"
//     placeholder="Password"
//     value={signUpPassword}
//     onChange={this.onTextboxChangeSignUpPassword.bind(this)}
//   />
//   <br />
//   <button onClick={this.onSignUp.bind(this)}>Sign Up</button>
// </div>
// </form>
