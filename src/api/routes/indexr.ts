import { Router } from 'express';
import * as rout from '../controllers/indexr.controller';


export const router = Router();


router.get('/status', rout.showStatus);
router.get('/stats', rout.showStats);
