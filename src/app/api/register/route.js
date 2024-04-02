import { con } from "@/lib/db";
import { Register } from "@/lib/model/register"

import mongoose from "mongoose";
import bcrypt from 'bcrypt';

import { NextRequest, NextResponse } from "next/server";


export async function POST(req, res) {

    const payload=await req.json();
 
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
        await mongoose.connect(con)
        // Check if user already exists
        const existingUser = await Register.findOne({ email: payload.email });
        if (existingUser) {
            // return res.status(400).json({ message: 'Email already registered' });
            return NextResponse.json({ message: 'Email already registered',success:false });
        }
        const hashedPassword = await bcrypt.hash(payload.password,10); // 10 is the salt rounds
        const newUser = new Register({email:payload.email,password:hashedPassword});
       
        await newUser.save();
        // return res.status(201).json({ message: 'User registered successfully' });
        return NextResponse.json({ message: 'User registered successfully',success:true });
    } catch (error) {
        console.error('Registration error:', error);
        // return res.status(500).json({ message: 'Server Error' });
        return NextResponse.json({ message: 'Server Error',success:false });
    }
}