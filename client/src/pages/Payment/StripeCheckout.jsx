import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../../features/order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51OV904SEaOdv63aIijDInlHEsuJ1GrNRomcIEK3XO5MEgpVaLcdO0x6H47GV6hAnKoUOkZYwOUyUu9jqVUYCyo9x00ujelIVeW"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");

  const currentOrder = useSelector(selectCurrentOrder);
  console.log(currentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      "https://makeover-backend.onrender.com/api/v1/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalAmount: currentOrder.totalAmount,
          orderId: currentOrder.id,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "stripecheck");
        setClientSecret(data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe flex items-center justify-center my-8">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
