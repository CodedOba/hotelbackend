import { Booking } from "../models/booking.js";
import { Property } from "../models/property.js";
import { Room } from "../models/room.js";
import { User } from "../models/user.js";


const createBooking = async (req, res) => {
    try {

        const { roomId, checkIn, checkOut,nights,totalAmount, guests}=req.body
        console.log(req.body);
        

       // 🔍 Find data correctly
    const userProperty = await Property.findOne({ hostId: req.user.id });
    const room = await Room.findById(roomId);
    const user = await User.findById(req.user.id);

        const booking = await Booking.create({
      hostId: req.user.id,
      propertyId: userProperty._id,
      roomId: room._id,
      guestId: user._id,
      checkIn,
      checkOut,
      guests,
      nights,
      totalAmount,
    });

        res.status(201).json({
            success: true,
            message: "Booking created. Complete payment to comfirm ",
            data: {
                booking:{
                    _id:  booking._id,
                    guestId: user._id,
                    propertyId: userProperty._id,
                    roomId: room._id,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    nights: booking.nights,
                    guests: booking.guests,
                    totalAmount: booking.totalAmount,
                    status: booking.status,
                    paymentRef: booking.paymentRef,
                    expiresAt: booking.expiresAt
                },
                paymentUrl: booking.paymentUrl
            }
        })

        


    } catch (error) {
        console.log(error);
         res.status(500).json(error.message);
        
        
        
    }
    
}
export {createBooking}