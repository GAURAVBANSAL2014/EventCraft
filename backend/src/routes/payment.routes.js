import { Router } from "express";
import { createPayment } from "../controllers/Payment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const paymentRouter = Router();

paymentRouter.route("/pay").post(verifyJWT, createPayment);

export default paymentRouter;
