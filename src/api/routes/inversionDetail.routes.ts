import { Router } from 'express';
import * as inversionDetail from '../controllers/inversionDetail.controller';


export const router = Router();

router.get('/inversion/:id/inversionDetail', inversionDetail.getInversionDetailByInversionId);
router.get('/inversionDetail/:id', inversionDetail.getInversionDetailById);
router.delete('/inversionDetail/:id', inversionDetail.deleteInversionDetail);
router.post('/inversion/:id/inversionDetail', inversionDetail.createNewInversionDetail);
router.put('/inversionDetail/:id', inversionDetail.updateInversionDetail);
