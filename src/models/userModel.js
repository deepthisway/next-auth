import mongoose from "mongoose";

const userSchema= new mongoose.SChema({
    username:
    {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email:
    {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    email:
    {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordTooken: String,
    forgotPasswordTookenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
    
})

const User = mongoose.model.users || mongoose.model("users", userSchema);

export default User;

