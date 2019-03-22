import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../UI/Input/Input';

class UserLoginForm extends Component{
  constructor(props){
    super(props);
    this.state={
      loginFail: true,
      loginForm: {
        email: {
          dataName: 'email',
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'LOGIN E-MAIL'
          },
          value: '',
          validation:{
              required: true
          },
          valid: false,
          touched: false
        },
        password: {
          dataName: 'password',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'PASSWORD'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        } // end password
      } //end loginForm
    } //end this state
  } // end constructor

  loginOnChange(e){
    const key = e.target.getAttribute('data-name');
    const value = e.target.value;
    const root = e.target.id;
    this.setState(prevState => ({
      ...prevState,
      loginForm: {
        ...prevState.loginForm,
        [key] : {
          ...prevState.loginForm[key],
          value
        }
      }
    }))
  }

  onSignIn(e){
    e.preventDefault();

    const { email, password } = this.state.loginForm;

    axios.post('/api/user/signin', {
      email: email.value, password: password.value
    })
      .then(res => {
        if(res.data.success){
         localStorage.setItem('the_main_app',
          JSON.stringify({ token: res.data.token })
          )
          window.location='/auth/products/'
        } else {
          this.setState({loginFail: false})
        }
      })
  }


  render(){
    const loginEleArr = [];
    for(let key in this.state.loginForm){
      loginEleArr.push({
        id: key,
        config: this.state.loginForm[key]
      })
    }

    let loginForm = (
      <>
        <div>
          { loginEleArr.map(ele =>
            <Input
              key={ele.id}
              classes="input-value"
              dataName={ele.config.dataName}
              elementType={ele.config.elementType}
              elementConfig={ele.config.elementConfig}
              value={ele.config.value}
              invalid={!ele.config.valid}
              shouldValidate={ele.config.validation}
              touched={ele.config.touched}
              changed={this.loginOnChange.bind(this)}
            />
          )}
        </div>
        <button onClick={this.onSignIn.bind(this)}>LOGIN</button>
      </>
    )


    return(
      <>
        {
          (this.state.loginFail === false)?
            (<p style={{textAlign: 'center'}}>Please Insert Correct Login Info</p>):
            (null)
        }
        <h2 style={{textAlign: 'center'}}>SIGN UP</h2>
        {loginForm}
      </>
    )
  }
}

export default UserLoginForm;
