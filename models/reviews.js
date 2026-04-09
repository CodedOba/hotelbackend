import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
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

  // bookingId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Booking",
  //   required: true,
  //   unique: true  
  // },

  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });

export const Review = mongoose.model("Review", reviewSchema);