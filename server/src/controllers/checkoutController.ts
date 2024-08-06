import { Request, Response } from 'express';
import { Cart, Order } from '../models';
import { User as UserType } from '../types';
import { authenticatePesapal, submitPesapalOrder } from '../lib/pesapal';

const getCart = async (req: Request) => {
  const user = req.user as UserType;
  return await Cart.findOne({ user: user._id }).populate('items.product');
};

const calculateCartTotal = async (req: Request) => {
  const cart = await getCart(req);
  const total = cart?.items.reduce(
    (acc: any, el: any) => acc + el.product.price * el.quantity,
    0
  );
  return total;
};

const createOrder = async (
  userId: string,
  amount: number,
  paymentMethod: string
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) return;

  const order = await Order.create({
    user: userId,
    total: amount,
    items: cart.items,
    paymentMethod,
  });

  await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { items: [] } });

  return order;
};

export const createPesapalTransaction = async (req: Request, res: Response) => {
  const user = req.user as UserType;
  try {
    const token = await authenticatePesapal();
    const totalAmount = await calculateCartTotal(req);

    console.log('Total Amount:', totalAmount);
    console.log('User Details:', user);

    const requestBody = {
      id: `ORDER_${Date.now()}`,
      currency: 'KES',
      amount: totalAmount.toFixed(2),
      description: 'Payment description goes here',
      callback_url: 'https://your-production-callback-url.com/payment-complete', // Update to production callback URL
      notification_id: process.env.PESAPAL_NOTIFICATION_ID,
      branch: 'Store Name - HQ',
      billing_address: {
        email_address: user.email,
        phone_number: user.phoneNumber,
        country_code: 'US', // Retrieve from user profile if needed
        first_name: user.name,
      },
    };

    const pesapalResponse = await submitPesapalOrder(token, user._id, requestBody);

    console.log('Pesapal Response:', pesapalResponse);

    if (pesapalResponse.error) {
      console.error('Pesapal Error:', pesapalResponse.error);
      return res.status(400).json({
        message: pesapalResponse.error.message || 'An error occurred with Pesapal payment. Please try again later.',
      });
    }

    const { order_tracking_id, merchant_reference, redirect_url } = pesapalResponse;

    if (!order_tracking_id) {
      throw new Error('Missing order_tracking_id in Pesapal response');
    }

    console.log('Pesapal order_tracking_id:', order_tracking_id);

    res.status(200).json({
      data: {
        order_tracking_id,
        redirect_url,
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send({ message: 'Unexpected error occurred. Please try again later.' });
  }
};
