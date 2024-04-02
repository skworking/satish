import mongoose from "mongoose";

const RegisterSchema=new mongoose.Schema({
    email:String,
    password:String
});
export const Register=mongoose.models.register || mongoose.model("register",RegisterSchema);