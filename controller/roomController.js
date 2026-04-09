
 import { Room } from "../models/room.js";
 import { Property } from "../models/property.js";
 import { uploadImage } from "../services/cloudinaryService.js";

 
 
 const createRoom = async (req, res) => {
  try {
    const { name, description, capacity, PricePerNight } = req.body;
    const amenities = JSON.parse(req.body.amenities);
   
  
    
const files = req.files || [];


if (!files.length) {
  return res.status(400).json({ success: false, message: "No images uploaded" });
}

const imageUrls = await Promise.all(
  files.map(async (file) => {
    const result = await uploadImage(file.buffer);
    return { url: result.secure_url, public_id: result.public_id };
  })
);
const userPropertyId = await Property.findOne({hostId:req.user.id})

    const room = await Room.create({
      hostId: req.user.id,
      propertyId:userPropertyId._id,
      name,
      description,
      capacity,
      PricePerNight,
      amenities,
      images: imageUrls,
      isApproved: false
    });

    res.status(201).json({
      success: true,
      message: "Room added successfully.",
      data: {
        id: room._id,
        hostId: req.user.id,
        propertyId: userPropertyId._id,
        name: room.name,
        capacity: room.capacity,
        pricePerNight: room.PricePerNight,
        amenities: room.amenities,
        image: room.images,
        isAvailable: room.isAvailable,
        createdAt: room.createdAt
        


      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export {createRoom}