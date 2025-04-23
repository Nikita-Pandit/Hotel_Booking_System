
const Room=require("../models/Room")
const Booking=require("../models/Booking")

//AddRoom
const addRoomController=async (req,res)=>{
const   { roomNumber, price, roomType }=req.body;
console.log("room added", req.body)
try {
    const newRoom = new Room({ roomNumber, price, roomType});
    console.log("newRoom", newRoom)
    await newRoom.save();
    console.log("newRoom2", newRoom)
    res.status(201).json({ success:true, message: "Room added successfully", room: newRoom });
  } catch (error) {
    res.status(500).json({ message: "Error adding room", error });
  }
}


//deleteRoom
const deleteRoomController=async(req,res)=>{
  try {
    console.log("id",req.params.id);
   const result= await Room.findByIdAndDelete(req.params.id);
   console.log("result",result);
    res.json({ success:true, message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room", error });
  }
}


const editRoomController = async (req, res) => {
  try {
    console.log("Editing Room ID:", req.params.id);
    const { roomNumber, price, roomType } = req.body;
    const id = req.params.id;

    const result = await Room.findOneAndUpdate(
      { _id: id }, // Query by _id
      { roomNumber, price, roomType }, // Update fields
      { new: true } // Return updated document
    );

    if (!result) {
      return res.status(404).json({ message: "Room not found" });
    }

    console.log("Updated Room:", result);
    res.json({success:true, message: "Room edited successfully", updatedRoom: result });
  } catch (error) {
    console.error("Error editing room:", error);
    res.status(500).json({ message: "Error editing room", error });
  }
};







//fetchAllRooms
const fetchAllRooms=async(req,res)=>{
  try {
    const rooms = await Room.find();
    console.log("rooms",rooms)
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms"});
  }
}


// routes/admin.js

  // const fetchAllRooms=async(req,res)=>{
  //   try {
  //     const { roomType, priceRange, search } = req.query;
      
  //     // Build the query object
  //     let query = {};
      
  //     // Add roomType filter if provided
  //     if (roomType) {
  //       query.roomType = roomType;
  //     }
      
  //     // Add price range filter if provided
  //     if (priceRange) {
  //       const [min, max] = priceRange.split('-').map(Number);
  //       query.price = { $gte: min, $lte: max };
  //     }
      
  //     // Add search filter if provided (search by room number)
  //     if (search) {
  //       query.roomNumber = { $regex: search, $options: 'i' };
  //     }
      
  //     // Execute the query
  //     const rooms = await Room.find(query).sort({ price: 1 }); // Sort by price ascending
      
  //     res.json(rooms);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server Error' });
  //   }
  // };

  // const fetchAllRooms = async (req, res) => {
  //   try {
  //     const { roomType, priceRange, search } = req.query;
      
  //     console.log("roomType",roomType)
  //     console.log("priceRange",priceRange)
  //     // Build the query object
  //     let query = {};
      
  //     // Add roomType filter if provided
  //     if (roomType && roomType !== "undefined") {
  //       query.roomType = roomType;
  //     }
      
  //     // Add price range filter if provided
  //     if (priceRange && priceRange !== "undefined") {
  //       const [min, max] = priceRange.split('-').map(Number);
  //       query.price = { $gte: min, $lte: max };
  //     }
      
  //     // Add search filter if provided (search by room number)
  //     if (search && search !== "undefined") {
  //       query.roomNumber = { $regex: search, $options: 'i' };
  //     }
      
  //     // Execute the query
  //     const rooms = await Room.find(query).sort({ price: 1 });
      
  //     res.json(rooms);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server Error' });
  //   }
  // }; 





// const userBookedRooms=async (req,res)=>{
//   const bookings = await Booking.find().populate("roomId");
//   res.json(bookings);
// }
module.exports={addRoomController,deleteRoomController,fetchAllRooms,editRoomController}