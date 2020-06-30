import { Router } from 'express';
import * as withdrawal from '../controllers/withdrawal.controllers';


export const router = Router();

router.get('/inversion/:id/withdrawal', withdrawal.getWithdrawalByInversionId);
router.get('/withdrawal/:id', withdrawal.getWithdrawalById);
router.delete('/withdrawal/:id', withdrawal.deleteWithdrawal);
router.post('/inversion/:id/withdrawal', withdrawal.createNewWithdrawal);
router.put('/withdrawal/:id', withdrawal.updateWithdrawal);
