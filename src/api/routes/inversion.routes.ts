import { Router } from 'express';
import * as inversion from '../controllers/inversion.controller';


export const router = Router();

router.get('/userApp/:id/inversion', inversion.getInversionByUserAppId);
router.get('/inversion/:id', inversion.getInversionById);
router.delete('/inversion/:id', inversion.deleteInversion);
router.post('/userApp/:id/inversion', inversion.createNewInversion);
router.put('/inversion/:id', inversion.updateInversion);
