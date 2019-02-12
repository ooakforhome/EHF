import React, { Component } from 'react';

class OrderHistory extends Component {
  constructor(props){
    super(props);

    this.state = ({
      detailshow: null,
    })
  }

  showPurchaseDetail(i){
    (this.state.detailshow === i)?
    this.setState({detailshow: null}):
    this.setState({detailshow: i});
  }

  render(){
    return(
      <>
        <ul >
        { this.props.purchases.map((purchase, i) => {
            let date = purchase.created.split('').slice(0,10).join('');
            // console.log(purchase)
            return (
              <li
               key={i}
               className={this.state.detailshow === i ? 'orderHistoryBlock': ''}
               onClick={this.showPurchaseDetail.bind(this, i)}>
                <p>Purchase date : {date}</p>
                <div className={this.state.detailshow === i ? 'dottedBorder': 'hide'}>
                  {
                    purchase.products.map(((prod,i) => {
                      return(
                        <div key={`key-${i}`}>
                          <p>Product Name: {prod.product_name}</p>
                          <p>Purchased Price: {prod.purchase_price}</p>
                          <p>Number Purchased: {prod.quantity}</p>
                        </div>
                      )
                    }))
                  }
                </div>
              </li>
          )}
        )}
        </ul>
        <button onClick={this.props.goBackToMemberProfile}>Back</button>
      </>
    )
  }
}

export default OrderHistory;
