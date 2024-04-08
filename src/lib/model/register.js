import mongoose from "mongoose";

const RegisterSchema=new mongoose.Schema({
    email:String,
    role:String,
    token:String,
    createdAt: { type: Date, default: Date.now }
});
export const Register=mongoose.models.register || mongoose.model("register",RegisterSchema);