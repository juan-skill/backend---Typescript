import { Router } from 'express';
import * as driverlincense from '../controllers/driverlicense.controller';


export const router = Router();

router.get('/driverLicenses', driverlincense.getDriverLicense);
router.get('/userTypes/:id', driverlincense.getDriverLicenseById);
router.delete('/userTypes/:id', driverlincense.deleteDriverLicense);
router.post('/userTypes', driverlincense.createNewDriverLicense);
router.put('/userTypes/:id', driverlincense.updateDriverLicense);
