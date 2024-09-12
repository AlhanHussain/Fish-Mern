import express from "express";
import { cancelOrder, listOrders, placeOrder, updateStatus, userOrders } from "../controller/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";




const orderRouter = express.Router();


orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)
orderRouter.post('/cancel',authMiddleware,cancelOrder)



export default orderRouter;