// routes/checkoutRoutes.ts

import { Router } from 'express';
import {
  createStripeCharge,
  createPaypalTransaction,
  capturePaypalTransaction,
  createPesapalTransaction
} from '../controllers/checkoutController';
import { protect } from '../middleware';

const router = Router(); 

router.route('/create-stripe-charge').post(protect, createStripeCharge);

router.route('/create-paypal-transaction').post(protect, createPaypalTransaction);

router.route('/capture-paypal-transaction').post(protect, capturePaypalTransaction);

router.route('/create-pesapal-transaction').post(protect, createPesapalTransaction);

export { router as checkOutRoutes };
