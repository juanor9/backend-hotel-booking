import dotenv from 'dotenv';
import Stripe from 'stripe';
import { Response, Request } from 'express';

dotenv.config();
const apiKey = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(apiKey, {apiVersion: '2022-11-15'});
export async function handlePayment(req: Request, res: Response) {
  const { paymentMethod, amount, description } = req.body;
  try {
    const { id, card } = paymentMethod;
    const payment = await stripe.paymentIntents.create({ payment_method: id, amount, currency: 'usd', confirm: true, description: description });
    return res.json({ message: 'success', payment })
  } catch (error: any) {
    return res.status(500).json({message: error.message})
  }
}

