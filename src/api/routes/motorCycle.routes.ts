import { Router } from 'express';
import * as motorCycle from '../controllers/motorCycle.controller';


export const router = Router();

router.get('/motors', motorCycle.getMotorCycles);
router.get('/motors/:id', motorCycle.getMotoById);
router.delete('/motors/:id', motorCycle.deleteMotorById);
router.post('/motors', motorCycle.createNewMotorcycle);
router.put('/motors/:id', motorCycle.updateAMotor);
