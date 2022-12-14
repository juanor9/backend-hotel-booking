import Stripe from 'stripe';
import { Response, Request } from 'express';

const apiKey = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(apiKey, {apiVersion: '2022-11-15'});

export async function handlePayment(req: Request, res: Response) {
  const { paymentMethod, amount } = req.body;

  try {
    const { id, card } = paymentMethod;
    const payment = await stripe.paymentIntents.create({ payment_method: id, amount, currency: 'usd', confirm: true, description: 'Pago de prueba' });
    return res.json({ message: 'success', payment })
  } catch (error: any) {
    return res.status(500).json({message: error.message})
  }
}
