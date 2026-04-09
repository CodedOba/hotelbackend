import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },

  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },

  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  nights: { type: Number, required: true },
  guests: { type: Number, required: true },
  totalAmount: { type: Number, required: true },

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed", "refunded"],
    default: "pending"
  },

  paymentRef: String,       

  cancelledAt: Date,

  cancelReason: String,

  expiresAt: Date    
        
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);