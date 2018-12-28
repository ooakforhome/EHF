import react, { Component } from 'react';

// Import parts
import PaypalButton from './paypal/PaypalButton.js';

const CLIENT = {
  sandbox: process.env.PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.PAYPAL_CLIENT_ID_PRODUCTION
}
const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class PaymentConfirmPage extends Component{


render(){

  const onSuccess = (payment) => {
      // console.log('Successful payment!', payment);
      if(payment.paid === true){
        alert("your payment is successful");
        // window.location = '/receipt'
      }
  }

  let SubTotal = (!localStorage.cart)?0:JSON.parse(localStorage.cart)
    .map(item=>{ return item.retail* item.quantity})
      .reduce((acc, curr)=>{
        return acc+curr
        }, 0);

  const Total = parseFloat((SubTotal*1.07).toFixed(2));
  const tax = 0.07;
  let Items = [];
    (!localStorage.cart)?'':JSON.parse(localStorage.cart).forEach(item => Items.push({
      name: item.product.Product_Name,
      description: item.product.Product_Name,
      quantity: item.quantity,
      price: item.retail,
      sku: item.product.SKU,
      tax: parseFloat((item.retail*tax).toFixed(2)),
      currency: "USD",
    })
  );
  let Details = {
    subtotal: parseFloat(`${SubTotal}`),
    tax: parseFloat((SubTotal*.07).toFixed(2)),
    shipping: 0,
  }
  const shipAddress = (!localStorage.ShipAddress)?'';JSON.parse(localStorage.shipping_address)[0];
  let ShipAddress = [];
  (!localStorage.shipping_address)?'':JSON.parse(localStorage.shipping_address).forEach(item => ShipAddress.push({
  recipient_name: shipAddress.recipient_name,
  line1: shipAddress.line1,
  line2: shipAddress.line2,
  city: shipAddress.city,
  state: shipAddress.state,
  postal_code: shipAddress.postal_code,
  country_code: shipAddress.country_code,
  phone: shipAddress.phone,
  });
  // console.log(Details)
  // console.log(Total)

  const onError = (error) =>
    console.log('Erroneous payment OR failed to load script!', error);

  const onCancel = (data) =>
    console.log('Cancelled payment!', data);


  return(
    <>
      <PaypalButton
        client={CLIENT}
        env={ENV}
        commit={true}
        currency={'USD'}
        total={Total}
        items={Items}
        details= {Details}

        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />
    </>
    )
  }

}

export default PaymentConfirmPage
