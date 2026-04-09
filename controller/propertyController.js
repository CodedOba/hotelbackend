import { uploadImage } from "../services/cloudinaryService.js";
import { Property } from "../models/property.js";

const createProperty = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { title, description, type } = req.body;
    const address = JSON.parse(req.body.address);
    const amenities = JSON.parse(req.body.amenities);

    const files = req.files || []; 
    // console.log(files);
    

    // 🔥 Upload all images to Cloudinary
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const result = await uploadImage(file.buffer);

        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }),
    );

    const property = await Property.create({
      hostId: req.user.id, 
      title,
      description,
      type,
      address,
      amenities,
      images: imageUrls,
      isApproved: false,
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully. Awaiting admin approval.",
      data: {
        id: property._id,
        hostId: property.hostId,
        title: property.title,
        type: property.type,
        address: property.address,
        amenities: property.amenities,
        image: property.images,
        isApproved: property.isApproved,
        avgRating: property.avgRating,
        totalReviews: property.totalReviews,
        createdAt: property.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export { createProperty };