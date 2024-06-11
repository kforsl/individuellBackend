import { Router } from 'express';
import { getMenu, addProduct, changeProduct, deleteProduct } from '../controllers/menuController.js';
import productSchema from "../models/productSchema.js";
import joiHandler from "../middleware/joiHandler.js";
import adminHandler from '../middleware/adminHandler.js';

const router = Router();

// http://localhost:1337/menu
router.get('/', getMenu);

// http://localhost:1337/menu/add
// Lägg till en product
// { title, desc, price }
router.post('/add', adminHandler(), joiHandler(productSchema), addProduct);

// http://localhost:1337/menu/change/:id
// Ändra en product
// { title, desc, price }
router.post('/change/:id', adminHandler(), joiHandler(productSchema), changeProduct);

// http://localhost:1337/menu/delete/:id
// ta bort en product
router.delete('/remove/:id', adminHandler(), deleteProduct);

export default router;