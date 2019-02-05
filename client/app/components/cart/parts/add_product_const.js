import React from 'react';

// purchase_price * quantity = gTotal
const totalPrice=(qty, iprice)=>{
  const total = qty * iprice;
    return total;
}



const AddProduct=({ product_name, _id, purchase_price, image, quantity, qtyChangeHandler, removeInCart })=>(
        <div id="add_product_container" className="add_product_container" data-taget={_id}>
          <div className="col-3" >
            {
              (`${image}` === "null") ? "":
                (`${image}` === "undefined") ? "":
                  (`${image}` === "") ? "":
                    <img className="add_product_image" alt={product_name} src={`/api/imagesm/${image}`} />
            }

          </div>
          <div className="col-6">
            <p className="cart_product_name">{product_name}</p>
            <div className="col-12 fLeft">
              <p className="fLeft">$</p>
              <b><p id="pPrice" className="fLeft cart_product_price">{purchase_price}</p></b>
            </div>
            <div className="col-12 fLeft cart_product_qty_container">
              <p className="fLeft">qty</p>
              <input
                id = {_id}
                className="cart_product_qty"
                type="text"
                name={quantity}
                placeholder={quantity}
                onChange={qtyChangeHandler}
              />
            </div>
          </div>
          <div className="col-3">
            <div className="col-12 fLeft">
              <h2 className="fLeft">$</h2>
              <h2 id="gTotal" className="cart_product_total fLeft">{totalPrice(quantity, purchase_price)}</h2>
            </div>
            <div className="col-12 fLeft">
              <button
                className="cart_product_remove_btn"
                name={_id}
                onClick={removeInCart}>X Remove</button>
            </div>
          </div>
        </div>
    )

export default AddProduct;
