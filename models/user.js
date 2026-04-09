import mongoose from "mongoose";
import { type } from "node:os";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["guest", "host", "admin"],
    default: "guest"
  },

  phone: String,
  image_url: String,
  image_public_id: {type: String, default: "null"},

  isVerified: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  },

  refreshToken: String, 
  
  hostProfile: {
    bio: String,
    totalEarnings: {
      type: Number,
      default: 0
    }
  },

  bankDetails: {
    bankName: String,
    accountNumber: String,
    accountName: String
  }

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);