
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["hotel",  "apartment", "villa"]
  },

  address: {
    street: String,
    city: String,
    state: String,
    country: String
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number] 
    }
  },

  amenities: [String],

 images: [
  {
    url: String,
    public_id: String
  }
],

  isApproved: {
    type: Boolean,
  },

  isActive: {
    type: Boolean,
  },

  avgRating: {
    type: Number,
  },

  totalReviews: {
    type: Number,
  }

}, { timestamps: true });

export const Property = mongoose.model("Property", propertySchema);