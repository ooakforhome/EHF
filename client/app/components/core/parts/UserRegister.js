import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../UI/Input/Input';

class UserRegister extends Component {
  constructor(props){
    super(props);
    this.state = {
      formIsValid: false,
      userRegisterForm: {
        email: {
            dataName: "email",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your E-Mail Address'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
        password: {
            dataName: "password",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Password'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
        username: {
            dataName: "username",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'User Name'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        }
      },
      address: {
        recipient_name:{
            dataName: "recipient_name",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Recipient Name'
            },
            value: '',
            validation:{
                required: true
            },
              valid: false,
              touched: false
        },
        address1:{
            dataName: "address1",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Address'
            },
            value: '',
            validation:{
                required: true
            },
              valid: false,
              touched: false
        },
        address2:{
            dataName: "address2",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Address 2'
            },
            value: '',
            validation:{
                required: false
            },
              valid: false,
              touched: false
        },
        city:{
            dataName: "city",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'City'
            },
            value: '',
            validation:{
                required: true
            },
              valid: false,
              touched: false
        },
        state:{
            dataName: "state",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'State'
            },
            value: '',
            validation:{
                required: true
            },
              valid: false,
              touched: false
        },
        zipcode:{
            dataName: "zipcode",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            value: '',
            validation:{
                required: true
            },
              valid: false,
              touched: false
        },
        phone:{
            dataName: "phone",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Phone Number'
            },
            value: '',
            validation:{
                required: true
            },
              valid: false,
              touched: false
        }
      }
    }
  }

  signUpOnChange(e){
    let key = e.target.getAttribute('data-name');
    let value = e.target.value;
    this.setState(prevState =>({
      ...prevState,
      userRegisterForm:{
        ...prevState.userRegisterForm,
        [key]: {
          ...prevState.userRegisterForm[key],
          value
        }
      }
    }))
  }

  signUpAddressOnChange(e){
    let key = e.target.getAttribute('data-name');
    let value = e.target.value;
    this.setState(prevState =>({
      ...prevState,
      address:{
        ...prevState.address,
        [key]: {
          ...prevState.address[key],
          value
        }
      }
    }))
  }

  onSignUp(e) {
    e.preventDefault();
    const { email, password, username } = this.state.userRegisterForm;
    const { recipient_name, address1, address2, city, state, zipcode, phone
    } = this.state.address;

      axios.post('/api/member/signup', {
        email: email.value,
        password: password.value,
        username: username.value,
        shipping_address : {
          recipient_name: recipient_name.value,
          address1: address1.value,
          address2: address2.value,
          city: city.value,
          state: state.value,
          zipcode: zipcode.value,
          phone: phone.value
        }
      })
        .then(res => {
          if(res.data.success){
            localStorage.setItem('the_main_app', JSON.stringify({ token: res.data.token }));
            window.location='/auth/products/'
          }
        })
  }
  render(){
    const formElementsArray = [];
    for (let key in this.state.userRegisterForm){
      formElementsArray.push({
        id: key,
        config: this.state.userRegisterForm[key]
      })
    }
    const formElementsAddressArray = [];
    for (let key in this.state.address){
      formElementsAddressArray.push({
        id: key,
        config: this.state.address[key]
      })
    }
    let form = (
      <>
        <div>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    classes="input-value"
                    dataName={formElement.config.dataName}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={this.signUpOnChange.bind(this)} />
            ))}
        </div>
        <div>
            {formElementsAddressArray.map(formAddressElement => (
                <Input
                    key={formAddressElement.id}
                    classes="input-value"
                    dataName={formAddressElement.config.dataName}
                    elementType={formAddressElement.config.elementType}
                    elementConfig={formAddressElement.config.elementConfig}
                    value={formAddressElement.config.value}
                    invalid={!formAddressElement.config.valid}
                    shouldValidate={formAddressElement.config.validation}
                    touched={formAddressElement.config.touched}
                    changed={this.signUpAddressOnChange.bind(this)} />
            ))}
          </div>
            <button onClick={this.onSignUp.bind(this)}>Register</button>
      </>
    );
    return(
      <>
        <div>
            <h2 style={{textAlign: 'center'}}>SIGN UP</h2>
            {form}
        </div>
      </>
    )
  }
}

export default UserRegister;
