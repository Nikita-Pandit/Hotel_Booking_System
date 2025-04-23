const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  roomType: { type: String, enum: ["Standard", "Deluxe", "Suite"], required: true },
   availability: { type: Boolean, default: true },
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
