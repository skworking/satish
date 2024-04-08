import { con } from "@/lib/db";
import { Register } from "@/lib/model/register"

import mongoose from "mongoose";
// import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { NextRequest, NextResponse } from "next/server";

const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
  };
const sendEmail = (email, token) => {
  console.log("call",email,token);
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "64f3be8f066ec2",
      pass: "f600fe9e071379"
    }
  });
const mailOptions = {
    from: 'your@example.com',
    to: email,
    subject: 'Confirm Registration',
    text: `Click the following link to confirm your registration: http://yourwebsite.com/register/${token}`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

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
        else{

          const token = generateToken();
          const user = new Register({ email: payload.email, role: payload.role, token: token });
         
          sendEmail(payload.email, token);
          
          await user.save();
          return NextResponse.json({ message: 'Registration email sent',success:true });
        }
    } catch (error) {
        console.error('Registration error:', error);
        // return res.status(500).json({ message: 'Server Error' });
        return NextResponse.json({ message: 'Method not allowed',success:false });
    }
}