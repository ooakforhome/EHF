import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../../UI/Input/Input';
import API from '../../api_helper';


class UpdateUserInfoBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      formIsValid: false,
      token: JSON.parse(localStorage.getItem("the_main_app")).token,
      userUpdateForm: {
        username: {
            dataName: "username",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "username"
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
        recipient_name: {
            dataName: "recipient_name",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "recipient_name"
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
        address1: {
            dataName: "address1",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "address1"
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
        address2: {
            dataName: "address2",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "address2"
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
        city: {
            dataName: "city",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "city"
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
        state: {
            dataName: "state",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "state"
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
        zipcode: {
            dataName: "zipcode",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "zipcode"
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        },
        phone: {
            dataName: "phone",
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "phone"
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        }
      }// end userUpdateForm
    } // end this.state
  }

  updateOnChange(e){
    let key = e.target.getAttribute('data-name');
    let value = e.target.value;
    this.setState(prevState =>({
      ...prevState,
      userUpdateForm:{
        ...prevState.userUpdateForm,
        [key]: {
          ...prevState.userUpdateForm[key],
          value
        }
      }
    }))
  }

  componentWillMount(){
    this.findUserinfo();
  }

  findUserinfo(){
    API.loadUserIdByToken(this.state.token)
      .then(info => {
        API.findMemberInfo(info.data)
          .then(db => {
            this.setState({
              username: db.data.username,
              recipient_name: db.data.shipping_address.recipient_name,
              address1: db.data.shipping_address.address1,
              address2: db.data.shipping_address.address2,
              city: db.data.shipping_address.city,
              state: db.data.shipping_address.state,
              zipcode: db.data.shipping_address.zipcode,
              phone: db.data.shipping_address.phone,
            })
          })
      })
  }

  onUpdateSubmit(e) {
    e.preventDefault();
    const { username, recipient_name, address1, address2, city, state, zipcode, phone } = this.state.userUpdateForm;

    API.loadUserIdByToken(this.state.token)
      .then( userId => {
        axios.post(`/api/user/userupdate?_id=${this.state.token}`, {
          username: username.value,
          shipping_address: {
            recipient_name: recipient_name.value,
            address1: address1.value,
            address2: address2.value,
            city: city.value,
            state: state.value,
            zipcode: zipcode.value,
            phone: phone.value,
          }
        })
          .then(res => {
            if(res.data.success){
              console.log("successfully updated")
            }
          })
      })

  }
  render(){
    const formElementsArray = [];
    for (let key in this.state.userUpdateForm){
      formElementsArray.push({
        id: key,
        config: this.state.userUpdateForm[key]
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
              changed={this.updateOnChange.bind(this)} />
          ))}
        </div>
            <button onClick={this.onUpdateSubmit.bind(this)}>Register</button>
      </>
    );
    return(
      <>
        <div>
            <h2 style={{textAlign: 'center'}}>{this.state.username} UPDATE INFO</h2>
            {form}
        </div>
      </>
    )
  }
}

export default UpdateUserInfoBox;
