import { con } from "@/lib/db";
import { Register } from "@/lib/model/register"

import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req, res) {
    const payload=await req.json();
 
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { email, password } = req.body;
    try {
        await mongoose.connect(con)
        // Check if user already exists
        const existingUser = await Register.findOne({ email: payload.email });
        if (existingUser) {
            // return res.status(400).json({ message: 'Email already registered' });
            return NextResponse.json({ message: 'Email already registered',success:false });
        }
        const newUser = new Register(payload);
        console.log(newUser);
        await newUser.save();
        // return res.status(201).json({ message: 'User registered successfully' });
        return NextResponse.json({ message: 'User registered successfully',success:true });
    } catch (error) {
        console.error('Registration error:', error);
        // return res.status(500).json({ message: 'Server Error' });
        return NextResponse.json({ message: 'Server Error',success:false });
    }
}