import React from 'react'

const ProductsBox = (props) => {
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

  // const assignedClasses = [];
  //
  // if(props.cart.includes(props._id)){
  //   assignedClasses.push("item_inner_body", "innerBody", "bk-yes")
  // } else {
  //   assignedClasses.push("item_inner_body", "innerBody")
  // }
  // return(
  // <div className={assignedClasses.join(' ')} data-item={props._id}>
  // )
  return(
  <div className="item_container" >
    <div
     className={
      props.cart.includes(props._id)?
       "item_inner_body innerBody bk-yes":
       "item_inner_body innerBody"}
       data-item={props._id}
    >
      <div className="item_img">
        <div className="item_img_box">

          {
            (`${props.images}` === "null") ? <img src={`/api/imagesm/53ac2b249f75065fee4e03c999957d8a.jpg`} alt={props.Product_Name}/>:
              (`${props.images}` === "undefined") ? <img src={`/api/imagesm/53ac2b249f75065fee4e03c999957d8a.jpg`} alt={props.Product_Name}/>:
                (`${props.images}` === "") ? <img src={`/api/imagesm/53ac2b249f75065fee4e03c999957d8a.jpg`} alt={props.Product_Name}/>:
                  <img src={`/api/imagesm/${props.images}`} alt={props.Product_Name}/>
          }

        </div>
      </div>
      <div><p>Category: <strong>{props.Category_type}</strong></p></div>
      <div className="item_info_box">
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
        <button value={props._id} onClick={props.addToCart}> + Add to cart </button>
      </div>
      <h2>${props.Retail}</h2>
    </div>
  </div>
  )
}

export default ProductsBox;


// export const ProductsBox = (props) => (
//
//   <div className="item_container" >
//     <div className="item_inner_body innerBody" data-item={props._id}>
//       <div className="item_img">
//         <div className="item_img_box">
//
//           {
//             (`${props.images}` === "null") ? <img src={`/api/imagesm/1d919e518209e5cbfedd0713f2a75c5e.jpg`} alt={props.Product_Name}/>:
//               (`${props.images}` === "undefined") ? <img src={`/api/imagesm/1d919e518209e5cbfedd0713f2a75c5e.jpg`} alt={props.Product_Name}/>:
//                 (`${props.images}` === "") ? <img src={`/api/imagesm/1d919e518209e5cbfedd0713f2a75c5e.jpg`} alt={props.Product_Name}/>:
//                   <img src={`/api/imagesm/${props.images}`} alt={props.Product_Name}/>
//           }
//
//         </div>
//       </div>
//       <div><p>Category: <strong>{props.Category_type}</strong></p></div>
//       <div className="item_info_box">
//         <p className="item_name">Product Name: {shortName(props.Product_Name)}</p>
//         <p className="item_sku"> SKU#: {props.SKU} </p>
//         <p className="item_color"> Color: {props.Color}</p>
//         <p className="item_weight"> Shipping Weight: {props.Product_Shipping_Weight} </p>
//         <p className="item_weight"> Product Weight: {props.Product_Weight} </p>
//         <p className="item_size"> Package Dimensions: {props.Packing_Carton_Width}W x {props.Packing_Carton_Height}H x {props.Packing_Carton_Depth}D </p>
//         <p className="item_size"> Actural Dimensions: {props.Actual_Product_Width}W x {props.Actual_Product_Height}H x {props.Actual_Product_Length}D </p>
//       </div>
//       <div className="edit_box">
//         <button value={props._id} className="item_edit_button" onClick={props.handleClick}>
//           Detail
//         </button>
//         <button value={props._id} onClick={props.addToCart}> + Add to cart </button>
//       </div>
//       <h2>${props.Retail}</h2>
//     </div>
//   </div>
// )
