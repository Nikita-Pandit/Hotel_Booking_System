const express=require("express")
const router=express.Router()
const authMiddleware=require("../middlewares/authMiddleware")
const {addRoomController,deleteRoomController,fetchAllRooms,editRoomController}=require("../controllers/adminController")
router.post("/addRooms", addRoomController)
router.delete("/deleteRooms/:id",deleteRoomController)
router.put("/editRoom/:id", editRoomController)
// router.get("/rooms",authMiddleware,fetchAllRooms)
// router.get("/bookings",authMiddleware,userBookedRooms)
router.get("/rooms", fetchAllRooms)
module.exports=router