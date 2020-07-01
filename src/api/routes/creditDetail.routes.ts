import { Router } from 'express';
import * as creditDetail from '../controllers/creditDetail.controller';


export const router = Router();

router.get('/credit/:id/creditDetail', creditDetail.getCreditDetailByCreditId);
router.get('/creditDetail/:id', creditDetail.getCreditDetailById);
router.delete('/creditDetail/:id', creditDetail.deleteCreditDetail);
router.post('/credit/:id/creditDetail', creditDetail.createNewCreditDetail);
router.put('/creditDetail/:id', creditDetail.updateCreditDetail);
