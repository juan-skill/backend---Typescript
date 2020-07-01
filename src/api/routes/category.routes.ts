import { Router } from 'express';
import * as category from '../controllers/category.controller';


export const router = Router();

router.get('/moto/:id/category', category.getCategoryByMotorId);
router.get('/category/:id', category.getCategoryById);
router.delete('/category/:id', category.deleteCategory);
router.post('/moto/:id/category', category.createNewCategory);
router.put('/category/:id', category.updateCategory);
