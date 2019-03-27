import React, { Component } from 'react';
import  AdminDetailBox from '../parts/AdminDetailBox';

class AdminPro extends Component{

  render(){
    return(
      <>
        <div>
          <AdminDetailBox item={this.props.items} />
        </div>
      </>
    )
  }
}

export default AdminPro;
