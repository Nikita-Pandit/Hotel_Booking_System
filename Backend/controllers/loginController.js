// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User"); // Import User model

// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid Email" });
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role},
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ token, role: user.role, id:user._id, message: "Login Successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// module.exports = { loginController };


const userModel=require("../models/User");
const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");

const loginController=async (req,res)=>{
    const {email,password}=req.body
console.log(email)
    try{
    const user= await userModel.findOne({ email })
    
 
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Password Match:", isPasswordValid);
      const token=jwt.sign(
      {
        user:  {
          userID:user._id,
          email:user.email
        }
      },


      // {
      //   userID:user._id,
      //   email:user.email
      // },
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '1h' }  // Expiration time (optional)
    )

      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Incorrect password" });
      }

      res.status(200).json({ success: true, message: "Login successful", token, userID: user._id});
  }
  catch(error){
    console.error("Something went wrong", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}



const crypto = require('crypto'); // Import crypto module
const resetPassword = require('../utils/resetPassword');

const forgotPasswordController=async(req,res)=>{
  const { email } = req.body;
  console.log(email)
      try {
          const user = await userModel.findOne({ email });
          if (!user) {
              // Avoid exposing whether the email exists for security reasons
              return res.status(200).json({ message: 'If the email exists, a reset link will be sent.' });
          }
  
          // Generate a token and set expiration time
          const resetToken = crypto.randomBytes(32).toString('hex');
          const resetTokenExpires = Date.now() + 3600000; // 1 hour validity
  
          // Save token and expiration in the user record
          user.resetPasswordToken = resetToken;
          user.resetPasswordExpires = resetTokenExpires;
          await user.save().catch(error => {
              console.error('Error saving user:', error);
              return res.status(500).json({ message: 'Failed to save reset token. Please try again later.' });
          });
          // Send the reset email
          const resetEmailSent = await resetPassword(email, resetToken, user.name);
          if (resetEmailSent) {
              res.status(200).json({ message: 'If the email exists, a reset link will be sent.' });
          } else {
              res.status(500).json({ message: 'Failed to send reset email. Please try again later.' });
          }
      } catch (err) {
          console.error('Error in forgotPasswordController:', err);
          res.status(500).json({ message: 'Server error. Please try again later.' });
      }
}


const resetPasswordController=async(req,res)=>{
  const { token, password } = req.body; 
  console.log(password)
  try {
     const user = await userModel.findOne({
       resetPasswordToken: token,
       resetPasswordExpires: { $gt: Date.now() }, // Check token expiration
     });
 
     if (!user) {
       return res.status(400).json({ message: 'Invalid or expired token.' });
     }
     user.password = password;
     // Clear the reset token and expiration
     user.resetPasswordToken = undefined;
     user.resetPasswordExpires = undefined;
 console.log(user)
     await user.save();
     console.log(user)
     try {
      await user.save();
      res.status(200).json({ message: 'Password reset successful.' });
  } catch (saveError) {
      console.error("Error saving user:", saveError);
      return res.status(500).json({ message: 'Error saving password.' });
  }
  } 
  catch (saveError) {
      console.error("Error saving user:", saveError);
      return res.status(500).json({ message: 'Error saving password.' });
  }

}

module.exports={loginController,forgotPasswordController,resetPasswordController}