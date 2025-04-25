// const mongoose = require("mongoose");

// const RoomSchema = new mongoose.Schema({
//   roomNumber: { type: String, required: true, unique: true },
//   price: { type: Number, required: true },
//   roomType: { type: String, enum: ["Standard", "Deluxe", "Suite"], required: true },
//    availability: { type: Boolean, default: true },
// });

// const Room = mongoose.model("Room", RoomSchema);
// module.exports = Room;



const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  roomType: { type: String, enum: ["Standard", "Deluxe", "Suite"], required: true },
  description: { type: String },
  availability: { type: Boolean, default: true },
  image: { type: String }, // For image URL
  features: [{ type: String }], // Example: ["WiFi", "AC", "TV"]
  bedType: { type: String, enum: ["Single", "Double", "King"] }
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
