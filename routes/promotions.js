import { Router } from "express";
import { getPromotions, addPromotion } from '../controllers/promotionController.js';
import adminHandler from '../middleware/adminHandler.js';
import joiHandler from "../middleware/joiHandler.js";
import promotionSchema from "../models/promotionSchema.js";

const router = Router();

// http://localhost:1337/promotions
router.get("/", getPromotions);

// http://localhost:1337/promotions/add
router.post("/add", adminHandler(), joiHandler(promotionSchema), addPromotion);



export default router;