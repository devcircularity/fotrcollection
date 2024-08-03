import { Router } from 'express';
import {
  createPesapalTransaction,
} from '../controllers/checkoutController';
import { protect } from '../middleware';

const router = Router(); 

router.route('/create-pesapal-transaction').post(protect, createPesapalTransaction);

export { router as checkOutRoutes };
