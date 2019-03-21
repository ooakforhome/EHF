import React from 'react';
import '../style.css';
import Blank from '../../../styles/blank.jpg';


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

export const ProductsBox = ( props ) => (

  <div className="item_container" key={props._id}>
    <div className={props.innerClass}>
      <div className="item_img">
        <div className="item_img_box">

        {
          (!props.images)?
            <img src={Blank}/>:
            <img src={`/api/imagesm/${props.images}`} alt={props.Product_Name}/>
        }
        </div>
        </div>
      <div><p>Category: <strong>{props.Category_type}</strong></p></div>
      <div className="item_inf o_box">
        <p className="item_name">Product Name: {shortName(props.Product_Name)}</p>
        <p className="item_sku"> SKU#: {props.SKU} </p>
        <p className="item_color"> Color: {props.Color}</p>
        <p className="item_weight"> Shipping Weight: {props.Product_Shipping_Weight} </p>
        <p className="item_weight"> Product Weight: {props.Product_Weight} </p>
        <p className="item_size"> Package Dimensions: {props.Packing_Carton_Width}W x {props.Packing_Carton_Height}H x {props.Packing_Carton_Depth}D </p>
        <p className="item_size"> Actural Dimensions: {props.Actual_Product_Width}W x {props.Actual_Product_Height}H x {props.Actual_Product_Length}D </p>
      </div>
      <div className="edit_box">
        <button value={props._id} className="item_edit_button" onClick={props.handleClick}>
          Detail
        </button>
        <button onClick={props.toBuy} value={props._id}>
          Buy
        </button>
        <p>{props.Retail}</p>
      </div>
    </div>
  </div>
)

export default ProductsBox;
