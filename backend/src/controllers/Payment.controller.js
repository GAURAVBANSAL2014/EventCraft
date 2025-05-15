import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Razorpay = require('razorpay');
import { Payment } from '../models/payment.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPayment = async (req, res) => {

  const { amount, email, name, contact, address, event, tickets } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const createdPayment = new Payment({
      paymentId: razorpayOrder.id,
      amount,
      email,
      name,
      contact,
      address,
      currency: razorpayOrder.currency,
      status: razorpayOrder.status,
    });

    const savedPayment = await createdPayment.save();

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");

    user.bookedEvents.push({
      name: event.name,
      category: event.category,
      date: event.date,
      location: event.location,
      image: event.images[0],
      tickets: tickets,
    });

    await user.save();

    return res.status(201).json(new ApiResponse(201, savedPayment, "Payment created successfully."));
  } catch (error) {
    console.error('Error creating payment:', error);
    throw new ApiError(401, error?.message || "Error creating Payment");;
  }
};

export {createPayment};
