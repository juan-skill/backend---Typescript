import { Router } from 'express';
import * as movementType from '../controllers/movementType.controller';


export const router = Router();

router.get('/movementTypes', movementType.getMovementTypes);
router.get('/movementTypes/:id', movementType.getMovementTypeById);
router.delete('/movementTypes/:id', movementType.deleteMovementType);
router.post('/movementTypes', movementType.createNewMovementType);
router.put('/movementTypes/:id', movementType.updateMovementType);
