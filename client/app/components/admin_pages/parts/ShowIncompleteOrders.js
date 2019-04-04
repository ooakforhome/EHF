import React from "react"

const Detail = (props) =>{
  let products = props.detail.products
  if(!props.detail){
    return "hold it"
  } else{
    return(
      <ul>
        <li>Customer Name: {props.detail.customer_name}</li>
        <li>Customer E-Mail: {props.detail.customer_email}</li>
        <li>
          {
            (!products)?"":
              products.map((pro, i)=>{
                return(
                <ul key={i}>
                  <li>{pro.product_name}</li>
                  <li>{pro.purchase_price}</li>
                  <li>{pro.quantity}</li>
                </ul>
                )
            })
          }
        </li>
      </ul>
    )
  }
}

export const ShowIncompleteOrders = (props) =>{
  if(!props.orders){
    return "wait"
  }else{
    return(
      <ul>
      {
        props.orders.map((obj,i) =>{
          const date = obj.created.split("T")[0];
          return(
            <div key={i} >
              <p data-id={obj._id} onClick={props.viewOrderDetail}>
                {`Customer name: ${obj.customer_name}, Purchase date: ${date}`}
              </p>
            </div>
          )
        })
      }
      <Detail detail={props.purchaseDetail} />
      </ul>
    )
  }
}






// console.log(detail.created)
// console.log(detail.customer_email)
// console.log(detail.customer_name)
// console.log(detail.fullfill_status)
// console.log(detail.payment_status)
// console.log(detail.products =>[
//   product_id,
//   product_name,
//   purchase_price,
//   quantity,
//   status,
// ])
// console.log(detail.shipping_address =>[
//   address1,
//   city,
//   phone,
//   recipient_name,
//   state,
//   zipcode
// ])
