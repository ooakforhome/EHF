import React from 'react';

const OrderHistory =(props)=>{

  render(){
    return(
      <>
        <h2>Purchase History</h2>
        <p onClick={props.showPurchaseDetail}>{props.date}</p>
      </>
    )
  }
}

export default OrderHistory;
