import { con } from "@/lib/db";
import { Register } from "@/lib/model/register"

import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req, res) {
    const payload = await req.json()
    try {
        await mongoose.connect(con)
     
        const user = await Register.findOne({ email: payload.email });
        const passwordMatch = await bcrypt.compare(payload.password, user.password);
        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials',success:false});
        }
        if(user?.email === payload.email && passwordMatch ){
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', {
                expiresIn: '1h' 
            });
            return NextResponse.json({ user,token,success:true });
        }else {
            return NextResponse.json({ message: 'Invalid credentials', success: false });
          }
        // User authenticated successfully, generate JWT token
       
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Server Error' });
    }
}