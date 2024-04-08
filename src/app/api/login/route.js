import { con } from "@/lib/db";
import { Register } from "@/lib/model/register"

import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// export async function POST(req, res) {
//     const payload = await req.json()
//     try {
//         await mongoose.connect(con)
     
//         const user = await Register.findOne({ email: payload.email });
//         // const passwordMatch = await bcrypt.compare(payload.password, user.password);
//         if (!user) {
//             return NextResponse.json({ message: 'Invalid credentials',success:false});
//         }
//         if(user?.email === payload.email && passwordMatch ){
//             const token = jwt.sign({ userId: user._id }, 'your_secret_key', {
//                 expiresIn: '1h' 
//             });
//             return NextResponse.json({ user,token,success:true });
//         }else {
//             return NextResponse.json({ message: 'Invalid credentials', success: false });
//           }
//         // User authenticated successfully, generate JWT token
       
//     } catch (error) {
//         console.error('Login error:', error);
//         return NextResponse.json({ message: 'Server Error' });
//     }
// }

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  }
async function sendOTP(email, otp) {
    // In real-world scenario, you would send OTP via email or SMS
    console.log('Sending OTP:', otp, 'to', email);
    // For demonstration, just logging OTP to console
}
export async function POST(req,res){
    const payload = await req.json()
    try {
            await mongoose.connect(con)
             
            const user = await Register.findOne({ email: payload.email });
                // const passwordMatch = await bcrypt.compare(payload.password, user.password);
                if (!user) {
                    return NextResponse.json({ message: 'Invalid credentials',success:false});
                }else{
                    const otp = generateOTP();
                    await sendOTP(payload.email, otp);
                    res.NextResponse.json({ message: 'OTP sent to ' + email });
                }
        }catch(err){
            console.log(err);
        }
}