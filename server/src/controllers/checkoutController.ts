// controllers/checkoutController.ts

import { Request, Response } from 'express';
import { Cart, Order } from '../models';
import { User as UserType } from '../types';
import { createPaymentIntent } from '../lib/stripe';
import { client } from '../lib/paypal';
import { authenticatePesapal, submitPesapalOrder } from '../lib/pesapal';

const paypal = require('@paypal/checkout-server-sdk');

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

export const createStripeCharge = async (req: Request, res: Response) => {
  const user = req.user as UserType;
  const { paymentMethodId } = req.body;
  try {
    const totalAmount = await calculateCartTotal(req);
    await createPaymentIntent(totalAmount, paymentMethodId);
    const order = await createOrder(user._id, totalAmount, 'stripe');
    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).send({ message: 'Unexpected error occurred. Please try again later.' });
  }
};

export const createPaypalTransaction = async (req: Request, res: Response) => {
  const total = await calculateCartTotal(req);
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'PHP',
          value: total,
        },
      },
    ],
  });

  let order;
  try {
    order = await client().execute(request);
  } catch (err) {
    return res.status(500).send({ message: 'Unexpected error occurred. Please try again later.' });
  }

  res.status(200).json({
    data: {
      orderID: order.result.id,
    },
  });
};

export const capturePaypalTransaction = async (req: Request, res: Response) => {
  const user = req.user as UserType;
  const orderID = req.body.orderID;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client().execute(request);
    const amount =
      capture.result.purchase_units[0].payments.captures[0].amount.value;

    await createOrder(user._id, amount, 'paypal');
  } catch (err) {
    return res.send(500);
  }

  res.send(200);
};

// controllers/checkoutController.ts

export const createPesapalTransaction = async (req: Request, res: Response) => {
  const user = req.user as UserType;
  try {
    const token = await authenticatePesapal();
    const totalAmount = await calculateCartTotal(req);

    // Log the totalAmount to verify
    console.log('Total Amount:', totalAmount);

    console.log('User Details:', user);


    // Modify the requestBody to use user's information
    const requestBody = {
      id: `ORDER_${Date.now()}`,
      currency: 'USD',
      amount: totalAmount.toFixed(2),
      description: 'Payment description goes here',
      callback_url: 'http://localhost:3000/',
      notification_id: process.env.PESAPAL_NOTIFICATION_ID,
      branch: 'Store Name - HQ',
      billing_address: {
        email_address: user.email, // Use user's email
        phone_number: user.phoneNumber, // Use user's phone number
        country_code: 'US', // You might want to retrieve the user's country code from their profile
        first_name: user.name, // Use user's name
      },
    };

    const pesapalResponse = await submitPesapalOrder(token, user._id, requestBody);

    console.log('Pesapal Response:', pesapalResponse);

    const { order_tracking_id, merchant_reference, redirect_url } = pesapalResponse;

    // Ensure the response structure includes 'order_tracking_id'
    if (!order_tracking_id) {
      throw new Error('Missing order_tracking_id in Pesapal response');
    }
    console.log('Pesapal order_tracking_id:', order_tracking_id);

    res.status(200).json({
      data: {
        order_tracking_id,
        redirect_url,
        // ... (any other relevant data)
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ message: 'Unexpected error occurred. Please try again later.' });
  }
};


