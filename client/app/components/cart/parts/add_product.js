import React, { Component } from 'react';

class AddProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      qty: 2,
      image: "https://www.practicalmachinist.com/vb/attachments/f19/31196d1297092432-best-small-horizontal-milling-machine-dia.jpg"
    }
  }

  render(){
    return(
      <>
      // add_product should have fixed width and height
        <div id="add_product_container" className="add_product_container">
          <div className="col-3">
            <img className="add_product_image" src={this.state.image} />
          </div>
          <div className="col-6">
            <p className="cart_product_name">Simplicity Storage Cabinet with 2 Doors 2 Drawers</p>
            <div className="col-12 fLeft">
              <p className="fLeft">$</p>
              <b><p className="fLeft cart_product_price">20</p></b>
            </div>
            <div className="col-12 fLeft cart_product_qty_container">
              <p className="fLeft">qty</p>
              <input
                className="cart_product_qty"
                type="text"
                value={this.state.qty}
              />
            </div>
          </div>
          <div className="col-3">
            <div className="col-12 fLeft">
              <h2 className="fLeft">$</h2>
              <h2 className="cart_product_total fLeft">40</h2>
            </div>
            <div className="col-12 fLeft">
              <button className="cart_product_remove_btn">X Remove</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AddProduct;
