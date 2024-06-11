import { Router } from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";

const router = Router();

// http://localhost:1337/cart
router.get('/', getCart);

// http://localhost:1337/cart/:id
router.post('/:id', addToCart);

// http://localhost:1337/cart/:id
router.delete('/:id', removeFromCart);

export default router;