import { Payment } from "../models/payments.js";
import { User } from "../models/user.js";
import { Booking } from "../models/booking.js";




// 🟢 Initialize Payment

const initializePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // 🛡️ check input
    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "bookingId is required"
      });
    }

    // 🛡️ find booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // 💳 send to Paystack
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: req.user.email, // from auth middleware
        amount: booking.totalAmount * 100 // convert to kobo
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // 📤 send payment link
    res.status(200).json({
      success: true,
      message: "Payment initialized successfully",
      data: {
        paymentUrl: response.data.data.authorization_url,
        reference: response.data.data.reference
      
      }
    });

  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Payment initialization failed"
    });
  }
};


// 🔵 Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: "Payment reference is required"
      });
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const paymentData = response.data.data;

    // 🛡️ check success
    if (paymentData.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment not successful"
      });
    }

    // 🔥 OPTIONAL: update booking status
    const booking = await Booking.findOne({
      totalAmount: paymentData.amount / 100
    });

    if (booking) {
      booking.isPaid = true;
      await booking.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: paymentData
    });

  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Payment verification failed"
    });
  }
};

export { initializePayment, verifyPayment };