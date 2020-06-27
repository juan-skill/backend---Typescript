import { Router } from 'express';
import * as userType from '../controllers/userTypeApp.controller';


export const router = Router();

router.get('/userTypes', userType.getUsertypeApp);
router.get('/userTypes/:id', userType.getUsertypeAppById);
router.delete('/userTypes/:id', userType.deleteUserTypeAppById);
router.post('/userTypes', userType.createNewUserTypeApp);
router.put('/userTypes/:id', userType.updateAUserTypeApp);
