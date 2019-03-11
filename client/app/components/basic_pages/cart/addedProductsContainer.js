import React, { Component } from 'react';




class AddedProductsContainer extends Component {
  constructor(props){
    super(props);
    this.totalPrice = this.totalPrice.bind(this)
  }


  totalPrice(qty, iprice){
    const total = qty * iprice;
      return total;
  }

  render(){
    // product.Retail * quantity = gTotal

    return(
      <div id="add_product_container" className="add_product_container" data-taget={this.props.product._id}>
        <div className="col-3" >
          {
            (`${this.props.product.images}` === "null") ? "":
              (`${this.props.product.images}` === "undefined") ? "":
                (`${this.props.product.images}` === "") ? "":
                  <img className="add_product_image" alt={this.props.product.Product_Name} src={`/api/imagesm/${this.props.product.images}`} />
          }

        </div>
        <div className="col-6">
          <p className="cart_product_name">{this.props.product.Product_Name}</p>
          <div className="col-12 fLeft">
            <p className="fLeft">$</p>
            <b><p id="pPrice" className="fLeft cart_product_price">{this.props.retail}</p></b>
          </div>
          <div className="col-12 fLeft cart_product_qty_container">
            <p className="fLeft">qty</p>
            <input
              className="cart_product_qty"
              type="text"
              data-list={this.props.itemKey}
              value={this.props.quantity}
              onChange={this.props.qtyChangeHandler}
            />
          </div>
        </div>
        <div className="col-3">
          <div className="col-12 fLeft">
            <h2 className="fLeft">$</h2>
            <h2 id="gTotal" className="cart_product_total fLeft">{this.totalPrice(this.props.quantity, this.props.retail)}</h2>
          </div>
          <div className="col-12 fLeft">
            <button
              className="cart_product_remove_btn" data-value={this.props._id}
              onClick={this.props.removeInCart}>
                X Remove
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddedProductsContainer;
