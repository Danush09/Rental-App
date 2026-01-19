import dotenv from 'dotenv';
import express from 'express';
import Stripe from 'stripe';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency, bookingData } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency || 'usd',
      metadata: { bookingData: JSON.stringify(bookingData),  },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route to finalize booking
router.post('/complete-booking', async (req, res) => {
  const { bookingData, paymentIntentId } = req.body;
  try {
    const response = await fetch('http://localhost:8080/api/v1/booking/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    const result = await response.json();
    if (response.ok) {
      res.json({ success: true, message: 'Booking completed', booking: result.booking });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;