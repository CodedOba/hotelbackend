import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },

  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: { type: Number, required: true },
  currency: { type: String, default: "NGN" },
  reference: { type: String, required: true, unique: true },

  provider: {
    type: String,
    enum: ["paystack", "flutterwave"],
    default: "paystack"
  },

  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending"
  },

  paidAt: Date,
  metadata: mongoose.Schema.Types.Mixed  
}, { timestamps: true });

export const Payment = mongoose.model("Payment", paymentSchema);