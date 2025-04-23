
// const user=require("../models/User")
// const signUpController=async (req,res)=>{
//     const {email,name,password,contact}=req.body
//     console.log("signup", req.body);
//     try {
//       const user = new User({ name, email, password,contact});
//       await user.save();
//       res.status(201).json({ message: "User registered successfully", success:true});
//     } catch (err) {
//       res.status(400).json({ message: "Email already exists" });
//     }
// }
// module.exports={signUpController}





// const signUpController= async (req,res)=>{
//    const {name,password,contact,email}=req.body
//    console.log(req.body)
//    try{
// const verificationToken = crypto.randomBytes(32).toString('hex'); 
// const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // Token valid for 24 hours   
// const user= new  userModel({
//        name,
//        email,
//        password,
//        contact,
//        verificationToken,
//        verificationTokenExpiry
//       })
//       await user.save()
//       console.log(user.password)

//       //Send verification email
//       const emailSent = await sendVerificationMail(email, verificationToken);
//       if (emailSent) {
//          res.status(201).json({success:true, message: 'User created. Verification email sent!' });
//          console.log('User created. Verification email sent!')
//      } else {
//          res.status(500).json({ message: 'User created, but email not sent. Try again.' });
//          console.log(" 'User created, but email not sent. Try again.' ")
//      }
//    }

//    catch(error){
//       console.error('Error during signup:', error.message);
//       res.status(500).json({ success: false, message: 'Internal server error.' });
//    }
   
//    }
// module.exports={signUpController}



// const crypto = require('crypto');
// const userModel = require("../models/User");
// const sendVerificationMail = require('../utils/sendVerificationMail');

// const signUpController = async (req, res) => {
//     const { name, password, contact, email } = req.body;
//     console.log(req.body);
    
//     try {
//       console.log("hello mello")
//         // Check if user already exists
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Email already in use. Please use a different email or login.' 
//             });
//         }
//         console.log("hello mello2")
//         const verificationToken = crypto.randomBytes(32).toString('hex'); 
//         const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // Token valid for 24 hours
        
//         const user = new userModel({
//             name,
//             email,
//             password,
//             contact,
//             verificationToken,
//             verificationTokenExpiry
//         });

//         await user.save();
//         console.log(user.password);
//         console.log("hello mello3")

//         // Send verification email
//         const emailSent = await sendVerificationMail(email, verificationToken);
//         if (emailSent) {
//             res.status(201).json({ 
//                 success: true, 
//                 message: 'User created. Verification email sent!' 
//             });
//             console.log('User created. Verification email sent!');
//         } else {
//             // Note: The user is already saved at this point
//             res.status(500).json({ 
//                 success: false,
//                 message: 'User created, but email not sent. Try again.' 
//             });
//             console.log("User created, but email not sent. Try again.");
//         }
//     } catch (error) {
//         console.error('Error during signup:', error.message);
//         res.status(500).json({ 
//             success: false, 
//             message: 'Internal server error.' 
//         });
//     }
// };

// module.exports = { signUpController };




const crypto = require('crypto');
const userModel=require("../models/User")
const sendVerificationMail = require('../utils/sendVerificationMail');
// // const sendOTP = require('../utils/sendOTP'); 

const signUpController = async (req, res) => {
   const { name, password, contact, email } = req.body;
   console.log("Signup request received for:", email);
   
   try {
    //    const existingUser = await userModel.findOne({ email });
    //    if (existingUser) {
    //        console.log("Signup attempt with existing email:", email);
    //        return res.status(400).json({ 
    //            success: false, 
    //            message: 'Email already in use. Please use a different email or login.' 
    //        });
    //    }

       const verificationToken = crypto.randomBytes(32).toString('hex'); 
       const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
       
       const user = new userModel({
           name,
           email,
           password,
           contact,
           verificationToken,
           verificationTokenExpiry
       });

       await user.save();
       console.log("User saved to database:", user.email);

       // Send verification email
       console.log("Attempting to send verification email...");
       const emailSent = await sendVerificationMail(email, verificationToken);
       
       if (emailSent) {
           console.log('Verification email successfully sent to:', email);
           return res.status(201).json({ 
               success: true, 
               message: 'User created. Verification email sent!' 
           });
       } else {
           console.log("Failed to send verification email to:", email);
           // Consider cleaning up the user if email fails
           await userModel.deleteOne({ email });
           return res.status(500).json({ 
               success: false,
               message: 'Failed to send verification email. Please try again.' 
           });
       }
   } catch (error) {
       console.error('Error during signup:', error);
       return res.status(500).json({ 
           success: false, 
           message: 'Internal server error.',
           error: error.message // Only for development, remove in production
       });
   }
};


module.exports = { signUpController };