import React, { Component } from 'react';
import axios from 'axios';

class NewMemberSignUp extends Component {
  render(){
    const { signUpEmail, signUpPassword, signUpError } = this.props;
    return(
      <div>
        <div className={(this.props.signupActive)?"sign_up_container box_shadow": "sign_up_container box_shadow hide"}>

              <p>{signUpError}</p>

          <p className="text-center">Sign Up</p>
          <input
            className="col-11 input-space"
            type="email"
            autoComplete="off"
            placeholder="Email"
            onChange={this.props.onTextboxChangeSignUpEmail}
          />
          <br />
          <input
            className="col-11 input-space"
            type="password"
            autoComplete="off"
            placeholder="Password"
            onChange={this.props.onTextboxChangeSignUpPassword}
          />
          <br />
          <button onClick={this.props.onSignUp}>Sign Up</button>
        </div>
      </div>
    )
  }
}

export default(NewMemberSignUp);
