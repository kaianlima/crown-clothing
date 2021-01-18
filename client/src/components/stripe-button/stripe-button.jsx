import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { clearCart } from "../../redux/cart/cart.actions";

const StripeCheckoutButton = ({ price, clearCart }) => {
  const history = useHistory();
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51I8HZpEI6Ytr953eO6GpBh39tfn5EclFr5zG91fLmlycprlri5GHW2wJoLGz2DJVK1SBShqOR9tfbghw0EjgO0ev00X57C9HNc";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        clearCart();
        history.push("/");
        alert("Payment successful");
      })
      .catch((error) => {
        console.log("Payment error: ", error);
        alert(
          "There was an issue with your payment. Please make sure you use the provided credit card"
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Crown Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
