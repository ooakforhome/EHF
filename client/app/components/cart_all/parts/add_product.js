import React, { Component } from 'react';

class AddProduct extends Component {
  constructor(props){
    super(props)

  }

  render(){
    return(
      <div id="add_product_container" className="add_product_container" data-taget={this.props._id}>
        <div className="col-3" >
          {
            (`${this.props.image}` === "null") ? "":
              (`${this.props.image}` === "undefined") ? "":
                (`${this.props.image}` === "") ? "":
                  <img className="add_product_image" alt={this.props.product_name} src={`/api/imagesm/${this.props.image}`} />
          }

        </div>
        <div className="col-6">
          <p className="cart_product_name">{this.props.product_name}</p>
          <div className="col-12 fLeft">
            <p className="fLeft">$</p>
            <b><p id="pPrice" className="fLeft cart_product_price">{this.props.purchase_price}</p></b>
          </div>
          <div className="col-12 fLeft cart_product_qty_container">
            <p className="fLeft">qty</p>
            <input
              id = {this.props._id}
              className="cart_product_qty"
              type="number"
              min = "1"
              max = "25"
              name={this.props._id}
              placeholder={this.props.quantity}
              onChange={this.props.qtyChangeHandler}
            />
            <button onClick={this.props.updateQty}>Update</button>
          </div>
        </div>
        <div className="col-3">
          <div className="col-12 fLeft">
            <h2 className="fLeft">$</h2>
            <h2 id="gTotal" className="cart_product_total fLeft">{this.props.totalPrice}</h2>
          </div>
          <div className="col-12 fLeft">
            <button
              className="cart_product_remove_btn"
              name={this.props._id}
              onClick={this.props.removeInCart}>X Remove</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddProduct;
