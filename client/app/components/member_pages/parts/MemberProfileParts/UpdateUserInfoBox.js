import React, { Component } from 'react';
import API from '../../api_helper';
// import cart from './cart-helper';

class UpdateUserInfoBox extends Component {
  constructor(props){
    super(props);
      this.state={
        memberData : {}
      }
  }

componentWillMount(){
  this.findUserinfo();
}

findUserinfo(){
  const tkid = JSON.parse(localStorage.getItem("the_main_app")).token;
  API.loadUserIdByToken(tkid)
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

  render(){
    return(
      <>
        <div className="update_address_containerk">
          <h2>UPDATE ADDRESS</h2>
        </div>

        <form onSubmit={this.props.updateSubmit}>
          <div>
            <label htmlFor="name"><i className="">NAME</i></label>
            <input
              placeholder={this.state.username}
              type="text"
              id="name"
              name="username"
              onChange={this.props.memberAddressChange}/>
          </div>

          <p>ADDRESS</p>
          <div>
            <label htmlFor="street"><i className="">Recipient Name</i></label>
            <input
              placeholder={this.state.recipient_name}
              type="text"
              id="street"
              name="recipient_name"
              onChange={this.props.memberAddressChange}/>
          </div>
          <div>
            <label htmlFor="address_1"><i className="">STREET</i></label>
            <input
              placeholder={this.state.address1}
              type="text"
              id="address_1"
              name="address1"
              onChange={this.props.memberAddressChange}/>
          </div>
          <div>
            <label htmlFor="address_2"><i className="">STREET</i></label>
            <input
              placeholder={this.state.address2}
              type="text"
              id="address_2"
              name="address2"
              onChange={this.props.memberAddressChange}/>
          </div>
          <div>
            <label htmlFor="city"><i className="">CITY</i></label>
            <input
              placeholder={this.state.city}
              type="text"
              id="city"
              name="city"
              onChange={this.props.memberAddressChange}/>
          </div>
          <div>
            <label htmlFor="state"><i className="">STATE</i></label>
            <input
              placeholder={this.state.state}
              type="text"
              id="state"
              name="state"
              onChange={this.props.memberAddressChange}/>
          </div>
          <div>
            <label htmlFor="zip"><i className="">ZIP CODE</i></label>
            <input
              placeholder={this.state.zipcode}
              type="text"
              id="zip"
              name="zipcode"
              onChange={this.props.memberAddressChange}/>
          </div>
          <div>
            <label htmlFor="phone_number"><i className="">Phone #</i></label>
            <input
              placeholder={this.state.phone}
              type="text"
              id="phone_number"
              name="phone"
              onChange={this.props.memberAddressChange}/>
          </div>
          <button className="change_address_btnk" type="submit">SUBMIT</button>
        </form>
        <button onClick={this.props.goBackToMemberProfile}>Back</button>
      </>
    )
  }

}// end class component

export default UpdateUserInfoBox;
