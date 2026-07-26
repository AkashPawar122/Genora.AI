import express from "express";
import isAuth from "../middlewares/isAuth.js";

import { billing } from "../controllers/billing.controller.js";
import { verifyPayment } from "../controllers/payment.controller.js";

const billingRouter = express.Router();

// Create Razorpay Order
billingRouter.post("/", isAuth, billing);

// Verify Successful Payment
billingRouter.post("/verify", isAuth, verifyPayment);

export default billingRouter;