
// const mongoose=require("mongoose")
// const bcrypt=require("bcrypt")

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true, required:true},
//   password: { type: String, required: true },
//   contact:{type:Number, required:true},
//   role: { type: String, enum: ["user", "admin"], default: "user" },
// });

// UserSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });
// const User = mongoose.model("User", UserSchema);
// module.exports=User




const mongoose=require("mongoose")
const bcrypt = require('bcryptjs');


const UserSchema=new mongoose.Schema({
    name:{ type: String, required: true },
    password: { type: String, required: true },
    contact:{ type: Number, required: true },
    email:{ type: String, required: true},
    isVerified:{
        type: Boolean, default: false  
    },
    verificationToken:{
        type:String,
    },
    verificationTokenExpiry: { type: Date },
    resetPasswordToken: { type: String }, // Optional
    resetPasswordExpires: { type: Date }, // Optional
})

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});



const  userModel=mongoose.model("User",UserSchema)
module.exports=userModel