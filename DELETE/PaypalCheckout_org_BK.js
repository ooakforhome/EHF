import React, { Component } from 'react';
import PaypalButton from './PaypalButton';


const CLIENT = {
  sandbox: 'AeK8ZZ1wQQvzSlZBRhS0mjHSz5JOguwuR8wi7yleu4byGxwuhZw86Xjow7iyz2TWJ_9Yz3dl0W2uMg4k',
  production: 'AeK8ZZ1wQQvzSlZBRhS0mjHSz5JOguwuR8wi7yleu4byGxwuhZw86Xjow7iyz2TWJ_9Yz3dl0W2uMg4k'
}

// const ENV = process.env.NODE_ENV === 'production'
//   ? 'production'
//   : 'sandbox';
const ENV = 'sandbox';

class PaypalCheckout extends Component  {
  render() {
    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return (
      <>
      <div>PAYPAL BUTTON</div>
      <div>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={'USD'}
          total={0.01}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
      </>
    );
  }
}

export default PaypalCheckout;
