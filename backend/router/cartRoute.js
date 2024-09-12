import express from "express";
import { addToCart, getCart, removeFromCart } from "../controller/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";




const cartRouter = express.Router();



cartRouter.post('/add',authMiddleware,addToCart);
cartRouter.post('/remove',authMiddleware,removeFromCart);
cartRouter.post('/list',authMiddleware,getCart)


export default cartRouter;