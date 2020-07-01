import { Router } from 'express';
import * as creditPayment from '../controllers/creditpayment.controller';


export const router = Router();

router.get('/credit/:id/creditPayment', creditPayment.getCreditPaymentByCreditId);
router.get('/creditPayment/:id', creditPayment.getCreditPaymentById);
router.delete('/creditPayment/:id', creditPayment.deleteCreditPayment);
router.post('/credit/:id/creditPayment', creditPayment.createNewCreditPayment);
router.put('/creditPayment/:id', creditPayment.updateCreditPayment);
