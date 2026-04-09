import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },
  
  name: String,
  description: String,

  capacity: String,
  pricePerNight: Number,

  images:[
  {
    url: String,
    public_id: String
  }
],

  amenities: [String],  
  isAvailable: {
    type: Boolean,
    default: true
  },

  bookedDates: [
    {
      checkIn: Date,
      checkOut: Date
    }
  ]
}, { timestamps: true });

export const Room = mongoose.model("Room", roomSchema);