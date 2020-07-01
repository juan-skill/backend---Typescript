import { Router } from 'express';
import * as product from '../controllers/product.controller';

export const router = Router();

router.get('/category/:id/product', product.getProductByCategoryId);
router.get('/product/:id', product.getProductById);
router.delete('/product/:id', product.deleteProduct);
router.post('/category/:id/product', product.createNewProduct);
router.put('/product/:id', product.updateProduct);
