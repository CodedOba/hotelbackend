import { Review } from "../models/reviews.js";
import { Property } from "../models/property.js";
import { User } from "../models/user.js";


const createReview = async (req, res) => {
  try {
    const { propertyId, rating, comment } = req.body;

    if (!propertyId || !rating) {
      return res.status(400).json({
        message: "propertyId and rating are required"
      });
    }

    // 🛡️ check property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    const user = await User.findById(req.user.id);
    // ⭐ create review
    const review = await Review.create({
         guestId: req.user.id,
      propertyId,
      rating,
      comment
    });

    res.status(200).json({
        success: true,
        message: "review submitted successfully",
        data: {
            id: review._id
             },
             gustId:{
                fullName: user.fullName,
                avatar: user.avatar
             },
            propertyId: review.propertyId,
             rating: review.rating,
             comment: review.comment,
             createdAt: review.createdAt
    })

  

  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};


export {createReview}