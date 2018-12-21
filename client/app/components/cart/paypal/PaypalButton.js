import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps;

    const isLoadedButWasntLoadedBefore =
      !this.state.showButton &&
      !this.props.isScriptLoaded &&
      isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }

  render() {
    const { total, currency, env, commit, client, onSuccess, onError, onCancel, items,shipping_address, recipient_name, line1, line2, city, country_code, postal_code, phone, state, } = this.props;
    const { showButton } = this.state;

    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [{
            amount: {
              total,
              currency,
            },
            description: 'The payment transaction description.',
            item_list: {
              items: []
              }
            }
          ]
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            locale: 'en_US',
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };

          onSuccess(payment);
        });

  return (
    <div>
      {showButton && <paypal.Button.react
        env={env}
        client={client}
        commit={commit}
        payment={payment}
        onAuthorize={onAuthorize}
        onCancel={onCancel}
        onError={onError}
      />}
    </div>
  );
  }

}

//Sandbox. https://api.sandbox.paypal.com
// Live. https://api.paypal.com
export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);