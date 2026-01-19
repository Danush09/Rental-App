// src/pages/PaymentPage.jsx
import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../components/PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const PaymentPage = () => {
  useEffect(() => {
    // Optional: any setup you may need
  }, []);

  return (
    <div className="container my-5">
      <h2>Enter Card Details to Pay</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;