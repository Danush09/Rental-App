// src/components/PaymentForm.jsx
import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    const bookingData = JSON.parse(localStorage.getItem('pendingBooking'));
    if (!bookingData) {
      alert('Booking data not found.');
      return;
    }

    // Create payment intent on backend
    const response = await fetch('http://localhost:8080/api/payment/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: bookingData.price,
        currency: 'usd', // or your currency
        bookingData,
      }),
    });
    const { clientSecret } = await response.json();

    // Confirm the card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(`Payment failed: ${result.error.message}`);
    } else if (result.paymentIntent.status === 'succeeded') {
      alert('Payment successful!');

      // Finalize booking on backend
      await fetch('/api/payment/complete-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingData,
          paymentIntentId: result.paymentIntent.id,
        }),
      });

      // Clear pending booking
      localStorage.removeItem('pendingBooking');
      // Redirect to profile or elsewhere
      window.location.href = '/profile';
    }
  };

  return (
    <div>
      <CardElement />
      <button
        disabled={!stripe}
        className="btn btn-success mt-3"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentForm;