import { Router } from 'express';
import * as credit from '../controllers/credit.controller';


export const router = Router();

router.get('/userApp/:id/credit', credit.getCreditByUserAppId);
router.get('/credit/:id', credit.getCreditById);
router.delete('/credit/:id', credit.deleteCredit);
router.post('/userApp/:id/credit', credit.createNewCredit);
router.put('/credit/:id', credit.updateCredit);
