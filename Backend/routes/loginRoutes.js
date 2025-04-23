const express=require("express")
const router=express.Router()
const {loginController,forgotPasswordController,resetPasswordController}=require("../controllers/loginController")
router.post("/login",loginController)
router.post("/forgot-password",forgotPasswordController)
router.post("/reset-password",resetPasswordController)
module.exports=router