import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  paymentId: String,
  amount: Number,
  email: String,
  name: String,
  contact: String,
  address: String,
  currency: String,
  status: { type: String, default: 'created' },
  createdAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.model("Payment", paymentSchema);