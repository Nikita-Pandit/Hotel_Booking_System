
const dotenv=require("dotenv")
const config=dotenv.config()
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");
const cors = require("cors");
const authMiddleware=require("./middlewares/authMiddleware")

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB connected successfully"))
.catch(err => console.error('Error connecting to MongoDB:', err));

const userModel=require("./models/User")
const Booking=require("./models/Booking")
const Room=require("./models/Room")

const signUpRoutes=require("./routes/signUpRoutes")
const loginRoutes=require("./routes/loginRoutes")
const adminWorks=require("./routes/adminRoutes")
app.use("/api/auth", signUpRoutes)
app.use("/api/auth",loginRoutes)
app.use("/api/admin", adminWorks)


// Book a Room
// app.post("/book", authMiddleware, async (req, res) => {
//   const { roomNumber, checkInDate, checkOutDate } = req.body;
//   try {
//     const booking = new Booking({
//       userId: req.user.id,
//       roomNumber,
//       checkInDate,
//       checkOutDate,
//     });
//     await booking.save();
//     res.status(201).json({ message: "Room booked successfully" });
//   } catch (err) {
//     res.status(400).json({ message: "Booking failed" });
//   }
// });

// Cancel a Booking
app.post("/cancel", authMiddleware, async (req, res) => {
  const { bookingId } = req.body;
  try {
    await Booking.findByIdAndUpdate(bookingId, { status: "cancelled" });
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(400).json({ message: "Cancellation failed" });
  }
});

// Admin: Get All Bookings
app.get("/admin/bookings", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });
  try {
    const bookings = await Booking.find().populate("userId", "name email");
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch bookings" });
  }
});



app.put("/api/admin/update-booking/:id", async (req, res) => {
  try {
      const { status } = req.body;
      const validStatuses = ["Pending", "Approved", "Rejected", "Cancelled"];
      
      if (!validStatuses.includes(status)) {
          return res.status(400).json({ 
              success: false,
              message: "Invalid status value" 
          });
      }

      const booking = await Booking.findByIdAndUpdate(
          req.params.id, 
          { status },
          { new: true }
      ).populate('userID').populate('roomID');

      if (!booking) {
          return res.status(404).json({ 
              success: false,
              message: "Booking not found" 
          });
      }

      res.json({ 
          success: true,
          message: "Booking updated successfully",
          booking 
      });
  } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({ 
          success: false,
          message: "Error updating booking",
          error: error.message 
      });
  }
});  

// Book a Room
// app.post("/api/user/book", authMiddleware, async (req, res) => {
//   const { roomId, date } = req.body;
//   const userId = req.user.id;
//   const username = req.user.username;

//   const newBooking = new Booking({ userId, roomId, username, date, status: "Pending" });
//   await newBooking.save();
//   res.json({ message: "Booking request sent!" });
// });

// app.get("/api/admin/rooms", async (req, res) => {
//   try {
//     const { priceMin, priceMax, roomType } = req.query;
//     let query = {};
    
//     if (priceMin && priceMax) {
//       query.price = { $gte: priceMin, $lte: priceMax };
//     }
    
//     if (roomType) {
//       query.roomType = roomType;
//     }
    
//     const rooms = await Room.find(query);
//     res.json(rooms);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching rooms", error });
//   }
// });




app.get("/api/rooms",async (req,res)=>{
  try {
    const rooms = await Room.find();
    console.log("rooms",rooms)
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms"});
  }
})
 


// Book a room (User sends booking request)
// app.post("/api/bookings", authMiddleware, async (req, res) => {
//   try {
//     console.log("Book room");
//     const { roomId } = req.body;
//     const userId = req.user._id;

//     const booking = new Booking({ user: userId, room: roomId });
//     await booking.save();

//     res.json({ message: "Booking request sent!", booking });
//   } catch (error) {
//     res.status(500).json({ message: "Error booking room", error });
//   }
// });


// app.post("/api/bookings", async (req, res) => {
//   try {
//     console.log("Booking request received:", req.body); // Log request data
//     const { roomID,userID } = req.body;
//   console.log("userID in api bookings",userID);


//     if (!roomID) {
//       return res.status(400).json({ message: "roomId is required" });
//     }

//     // const booking = new Booking({ user: userId, room: roomId });
//     const user=await User.findOne({_id:userID})
//     const room=await Room.findOne({_id: roomID})
//      const booking = new Booking({userID, roomID});
//     await booking.save();

//     res.json({ message: "Booking request sent!", booking});
//   } catch (error) {
//     console.error("Error in /api/bookings:", error);
//     res.status(500).json({ message: "Error booking room", error });
//   }
// });




// const Room = require('../models/Room');
// const User = require('../models/User');
//const { validateToken } = require('../middleware/auth');

const frontendUrl=process.env.FRONTEND_URL

app.get('/verify', async (req, res) => {
  const { token } = req.query;
  console.log("token",token);
  try {
    console.log("verify route 2")
      // Find the user with the token
      const userIDMatchWithToken=await userModel.findOne({verificationToken: token})
console.log(userIDMatchWithToken)
      const user = await userModel.findOneAndUpdate(
        
          { verificationToken: token },
          { isVerified: true, verificationToken: null },
          { new: true }
      );
      // console.log("Before SignUp",user)
       await user.save()
      //  console.log("After SignUp",user)



 
      
      if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token',user });
      }

      return res.redirect(`${frontendUrl}/signup?id=${user._id}`);
  } catch (error) {
      console.error('Error during verification:', error);
      res.status(400).json({ error: 'Verification failed' });
  }
})


app.post("/api/bookings",  async (req, res) => {
  try {
    const { roomID, userID, checkInDate, checkOutDate } = req.body;
console.log("/api/bookings",req.body)
    // Validation
    if (!roomID || !userID || !checkInDate || !checkOutDate) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required: roomID, userID, checkInDate, checkOutDate" 
      });
    }

    // Check if dates are valid
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({ 
        success: false,
        message: "Check-in date cannot be in the past" 
      });
    }

    if (checkOut <= checkIn) {
      return res.status(400).json({ 
        success: false,
        message: "Check-out date must be after check-in date" 
      });
    }

    // Check if room exists
    const room = await Room.findById({_id:roomID});
    if (!room) {
      return res.status(404).json({ 
        success: false,
        message: "Room not found" 
      });
    }

    // Check if user exists
    const user = await userModel.findById({_id:userID});
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Check for existing bookings that conflict with these dates
    const existingBooking = await Booking.findOne({
      roomID,
      $or: [
        { 
          checkInDate: { $lt: checkOutDate },
          checkOutDate: { $gt: checkInDate }
        },
        { status: "Approved" }
      ]
    });

    if (existingBooking) {
      return res.status(409).json({ 
        success: false,
        message: "Room is already booked for the selected dates" 
      });
    }

    // Create new booking
    const booking = new Booking({
      userID,
      roomID,
      checkInDate,
      checkOutDate,
      status: "Pending"
    });

    await booking.save();


    res.status(201).json({ 
      success: true,
      message: "Booking request sent successfully!",
      booking,
      user
    });

  } catch (error) {
    console.error("Error in /api/bookings:", error);
    res.status(500).json({ 
      success: false,
      message: "Error processing booking",
      error: error.message 
    });
  }
});






app.get("/api/user/bookRooms",async (req,res)=>{

  try {
    const rooms = await Booking.find()
    console.log("rooms",rooms)

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms"});
  }
})
// Add this to your backend
app.post("/api/users/batch", async (req, res) => {
  try {
      const { userIds } = req.body;
      const users = await userModel.find({ 
          _id: { $in: userIds } 
      }).select('name email _id');
      
      res.json(users);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users" });
  }
});


app.post("/api/rooms/batch", async (req, res) => {
  try {
      const { roomIds } = req.body;
      const rooms = await Room.find({ 
          _id: { $in: roomIds } 
      }).select('roomNumber roomType _id');
      
      res.json(rooms);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users" });
  }
});


app.get("/api/apple",authMiddleware, async(req,res)=>{
  console.log("mello mello mello")
  const { customerID } =req.query;

  try{
    console.log("apple", customerID);
const user=await userModel.findById(customerID)
if (!user) {
  return res.status(404).json({ message: "Customer not found" });
}
console.log("hello mello", user)
res.json(user);
  }
 catch (error) {
console.error("Error fetching customer:", error);
res.status(500).json({ message: "Server error" });
}
})



// // Get all bookings for a specific customer
app.get('/api/bookings', async (req, res) => {
  try {
    const { customerID } = req.query;
    
    // Validate customerID exists
    if (!customerID) {
      return res.status(400).json({ 
        success: false,
        message: 'Customer ID is required' 
      });
    }

    // Find bookings for this customer
    const bookings = await Booking.find({ userID:customerID })
      .populate('roomID') // If you want to include room details
      .sort({ checkInDate: -1 }); // Sort by check-in date (newest first)
console.log("bookings", bookings)
    res.status(200).json({
      success: true,
      count: bookings.length,
      info: bookings
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching bookings' 
    });
  }
});

// app.delete("/api/bookings/:bookingId", async(req,res)=>{
//   const {id}=req.params;
//   const user=await Booking.findOne({_id:id})
//   console.log("delete", user)
//   res.json(user)
// })
app.delete("/api/bookings/:bookingId", authMiddleware, async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    // Verify booking exists
    const booking = await Booking.findOne({ _id: bookingId });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Actually delete the booking
    await Booking.deleteOne({ _id: bookingId });
    
    res.status(200).json({ 
      success: true,
      message: "Booking canceled successfully",
      deletedId: bookingId
    });
    
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to cancel booking",
      error: error.message 
    });
  }
});


app.put("/api/updateCustomer/:customerID",authMiddleware, async(req,res)=>{
 
  try {
    const { customerID } = req.params;
    const updates = req.body;
    console.log("id", customerID)
console.log("updates", updates)
    // If password is being updated, hash it first
    // if (updates.password) {
    //   updates.password = await bcrypt.hash(updates.password, 10);
    // }

    const customer = await userModel.findByIdAndUpdate(
      customerID,
      { $set: updates },
      { new: true, runValidators: true }
    )
    // .select('-password'); // Don't return the password

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating customer',
      error: error.message 
    });
  }
})


// 🔐 Protected Route
app.get('/api/auth/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'Welcome to the protected route! You are authenticated.' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));