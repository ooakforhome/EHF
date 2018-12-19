import React from 'react'

const shortName=(name, limit=25)=>{
  let newName = [];
  if(name.length > limit){
    name.split('').reduce((acc, cur)=>{
      if(acc + cur.length <= limit){
        newName.push(cur)
      }
      return acc + cur.length;
    }, 0 );
    return `${newName.join('')} ...`;
  }
  return name
}


export const ProductsBox = ({
  _id, Product_Name, SKU, Category_type, images, Color, Product_Shipping_Weight, Product_Weight, Packing_Carton_Width, Packing_Carton_Height, Packing_Carton_Depth, Actual_Product_Width, Actual_Product_Height, Actual_Product_Length, handleClick, handleAddClick,addToCart, showAdded }) => (

  <div className="item_container" onLoad={showAdded}>
    <div className="item_inner_body innerBody" data-item={_id}>
      <div className="item_img">
        <div className="item_img_box">

          {
            (`${images}` === "null") ? "":
              (`${images}` === "undefined") ? "":
                (`${images}` === "") ? "":
                  <img src={`/api/imagesm/${images}`} alt={Product_Name}/>
          }

        </div>
      </div>
      <div><p>Category: <strong>{Category_type}</strong></p></div>
      <div className="item_info_box">
        <p className="item_name">Product Name: {shortName(Product_Name)}</p>
        <p className="item_sku"> SKU#: {SKU} </p>
        <p className="item_color"> Color: {Color}</p>
        <p className="item_weight"> Shipping Weight: {Product_Shipping_Weight} </p>
        <p className="item_weight"> Product Weight: {Product_Weight} </p>
        <p className="item_size"> Package Dimensions: {Packing_Carton_Width}W x {Packing_Carton_Height}H x {Packing_Carton_Depth}D </p>
        <p className="item_size"> Actural Dimensions: {Actual_Product_Width}W x {Actual_Product_Height}H x {Actual_Product_Length}D </p>
      </div>
      <div className="edit_box">
        <button value={_id} className="item_edit_button" onClick={handleClick}>
          Detail
        </button>
        <button value={_id} onClick={addToCart}> + </button>
      </div>
    </div>
  </div>
)

export default ProductsBox;
