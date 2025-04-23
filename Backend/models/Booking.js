// const mongoose=require("mongoose")

// const BookingSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   roomNumber: Number,
//   checkInDate: Date,
//   checkOutDate: Date,
//   status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
// });

// const Booking = mongoose.model("Booking", BookingSchema);

// const BookingSchema = new mongoose.Schema({
//   userId: String,
//   roomId: String,
//   username: String,
//   date: String,
//   status: { type: String, default: "Pending" }, // Pending, Confirmed, Rejected
// });
// const Booking = mongoose.model("Booking", BookingSchema);


// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
//   checkInDate: { type: Date, required: true },
//   checkOutDate: { type: Date, required: true },
//   status: { type: String, enum: ["Pending", "Confirmed", "Rejected"], default: "Pending" },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Booking", bookingSchema);

// const mongoose = require("mongoose");

// const BookingSchema = new mongoose.Schema({
//   userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   roomID: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
//   status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
//   checkInDate:,
//       checkOutDate:{

//       }
// });

// module.exports = mongoose.model("Booking", BookingSchema);


const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  roomID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Room", 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Approved", "Rejected", "Cancelled"], 
    default: "Pending" 
  },
  checkInDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(value) {
        return value >= new Date().setHours(0, 0, 0, 0);
      },
      message: "Check-in date cannot be in the past"
    }
  },
  checkOutDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(value) {
        return value > this.checkInDate;
      },
      message: "Check-out date must be after check-in date"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
BookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Add indexes for better query performance
BookingSchema.index({ userID: 1 });
BookingSchema.index({ roomID: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ checkInDate: 1, checkOutDate: 1 });

module.exports = mongoose.model("Booking", BookingSchema);

