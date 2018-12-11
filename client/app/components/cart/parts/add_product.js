import React from 'react';
import cart from '../cart-helper';

// product.Retail * quantity = gTotal
const totalPrice=(qty, iprice)=>{
  const total = qty * iprice;
    return total;
}



const AddProduct=({ name, product, quantity, qtyChangeHandler, removeInCart })=>(
      // add_product should have fixed width and height
        <div id="add_product_container" className="add_product_container">
          <div className="col-3" >
            <img className="add_product_image" alt={product.Product_Name} src={`/api/imagesm/${product.images}`} />
          </div>
          <div className="col-6">
            <p className="cart_product_name">{product.Product_Name}</p>
            <div className="col-12 fLeft">
              <p className="fLeft">$</p>
              <b><p id="pPrice" className="fLeft cart_product_price">{product.Retail}</p></b>
            </div>
            <div className="col-12 fLeft cart_product_qty_container">
              <p className="fLeft">qty</p>
              <input
                id = "pQty"
                className="cart_product_qty"
                type="text"
                name={name}
                value={quantity}
                onChange={qtyChangeHandler}
              />
            </div>
          </div>
          <div className="col-3">
            <div className="col-12 fLeft">
              <h2 className="fLeft">$</h2>
              <h2 id="gTotal" className="cart_product_total fLeft">{totalPrice(quantity, product.Retail)}</h2>
            </div>
            <div className="col-12 fLeft">
              <button className="cart_product_remove_btn" onClick={removeInCart}>X Remove</button>
            </div>
          </div>
        </div>
    )

export default AddProduct;
