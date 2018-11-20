import React, { Component } from 'react';
import 'whatwg-fetch';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      email: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
    };
  }

  componentDidMount() {
     const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
        const { token } = obj;
      // Verify token
      fetch('/api/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
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

  onTextboxChangeSignInEmail(event) {
    this.setState({
      email: event.target.value,
    });
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
      fetch('/api/account/signin', {
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
          console.log('json', json);
          if (json.success) {
            setInStorage('the_main_app', { token: json.token });
            this.setState({
              signInError: json.message,
              isLoading: false,
              signInPassword: '',
              signInEmail: '',
              token: json.token,
            });
          } else {
            this.setState({
              signInError: json.message,
              isLoading: false,
            });
          }
        });
    }

  onSignUp() {
      // Grab state
      const { signUpEmail, signUpPassword } = this.state;
      this.setState({
        isLoading: true,
      });
      // Post request to backend
      fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signUpEmail,
          password: signUpPassword,
        }),
      }).then(res => res.json())
        .then(json => {
          console.log('json', json);
          if (json.success) {
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



    render() {
      const { isLoading, token, signInError, email, signInPassword, signUpEmail, signUpPassword, signUpError } = this.state;
      if (isLoading) {
        return (<div><p>Loading...</p></div>);
      }
      if (!token) {
        return (
          <div>
            <div>
              {
                (signInError) ? (
                  <p>{signInError}</p>
                ) : (null)
              }
              <p>Sign In</p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={this.onTextboxChangeSignInEmail.bind(this)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={this.onTextboxChangeSignInPassword.bind(this)}
              />
              <br />
              <button>Sign In</button>
            </div>
            <br />
            <br />
            <div>
              {
                (signUpError) ? (
                  <p>{signUpError}</p>
                ) : (null)
              }
              <p>Sign Up</p>
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={this.onTextboxChangeSignUpEmail.bind(this)}
              /><br />
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={this.onTextboxChangeSignUpPassword.bind(this)}
              /><br />
              <button onClick={this.onSignUp.bind(this)}>Sign Up</button>
            </div>
         </div>
        );
      }
      return (
        <div>
          <p>Signed in</p>
        </div>
      );
    }
};
export default Login;
