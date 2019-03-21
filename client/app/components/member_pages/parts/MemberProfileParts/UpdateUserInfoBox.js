import React, { Component } from 'react';
import API from '../../api_helper';
// import cart from './cart-helper';

class UpdateUserInfoBox extends Component {
  constructor(props){
    super(props);
      this.state={
        memberData : {},
        s_address: this.props.s_address
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
    // if(!this.state.shipping_address){
    //   return "wait for shipping address"
    // }
    // console.log("UpdateUserInfoBox.js")
    // console.log(this.state.s_address)


    const AllStates = () =>{
      const states = [' ','AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'];

      return(
        <select
          id="state"
          data-name="state"
          defaultValue="GA"
          value={this.props.state}
          placeholder={this.props.state}
          onChange={this.props.memberAddressChange}>
            {
              states.map((state,i) => {
                return(
                  <option key={i} value={state}>{state}</option>
                )
              })
            }
          </select>
        )
      }

    return(
      <>
        <div className="update_address_containerk">
          <h2>UPDATE ADDRESS</h2>
        </div>

        <div>
          <p>ADDRESS</p>
          <div>
            <label htmlFor="street"><i className="">Recipient Name</i></label>
            <input
              placeholder={this.state.recipient_name}
              type="text"
              id="street"
              data-name="recipient_name"
              onChange={this.props.memberAddressChange}/>
          </div>
          <div>
            <label htmlFor="address_1"><i className="">STREET</i></label>
            <input
              placeholder={this.state.address1}
              type="text"
              id="address_1"
              data-name="address1"
              onChange={this.props.memberAddressChange}/>
          </div>
          <div>
            <label htmlFor="address_2"><i className="">STREET</i></label>
            <input
              placeholder={this.state.address2}
              type="text"
              id="address_2"
              data-name="address2"
              onChange={this.props.memberAddressChange}/>
          </div>
          <div>
            <label htmlFor="city"><i className="">CITY</i></label>
            <input
              placeholder={this.state.city}
              type="text"
              id="city"
              data-name="city"
              onChange={this.props.memberAddressChange}/>
          </div>
          <div>
          <label htmlFor="state"><i className="">STATE</i></label>
            <AllStates />
          </div>
          <div>
            <label htmlFor="zip"><i className="">ZIP CODE</i></label>
            <input
              placeholder={this.state.zipcode}
              type="text"
              id="zip"
              data-name="zipcode"
              onChange={this.props.memberAddressChange}/>
          </div>
          <div>
            <label htmlFor="phone_number"><i className="">Phone #</i></label>
            <input
              placeholder={this.state.phone}
              type="text"
              id="phone_number"
              data-name="phone"
              onChange={this.props.memberAddressChange}/>
          </div>
          <button className="change_address_btnk"  onClick={this.props.updateSubmit}>SUBMIT</button>
        </div>
        <button onClick={this.props.goBackToMemberProfile}>Back</button>
      </>
    )
  }

}// end class component

export default UpdateUserInfoBox;
