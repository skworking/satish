'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get, child } from 'firebase/database';
import { auth, database } from '@/component/Firebase/firebase';
import { encode } from 'firebase/database';
const Login = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    
    const handlechange = (e) => {
        setEmail(e.target.value);
    }
    const handleRoleChange = (event) => {
        setRole(event.target.value);
        console.log("Selected role:", event.target.value);
    };
    const encodeEmailAddress = (email) => {
        // Use the encode function to encode the email address
        return encode(email);
    };
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, 'password');
             // Check if user's role and email exist in the database
             const userRef = ref(database, 'users');
    
            
        
             
            //  if (userSnapshot.exists()) {
            //     console.log("call");
            //     const userData = userSnapshot.val();
            //     const { role, email } = userData;
            //     console.log(role,email);
    
            //     // Generate OTP
            //     // const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    
            //     // // Send OTP via email
            //     // await sendOtpByEmail(email, otp);
    
            //     console.log('OTP sent to email:', email);
            // } else {
            //     console.log('User not found');
            // }
             
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-2">
        <h1>Login User</h1>
    <form className="space-y-6" action="#" method="POST" onSubmit={(e) => { handleLogin(e) }}>
        <div className="mt-2">
            <select
                id="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                className="block w-full rounded-md border-2 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>

            </select>
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
            </label>
            <div className="mt-2">
                <input
                    id="email"
                    name={email}
                    type="email"
                    onChange={handlechange}
                    autoComplete="email"
                 
                    className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>



        <div>
            <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 `}
                // className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
       
            >
                Sign In
            </button>
        </div>
        <div className="text-sm">
                New user?
                  <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    register user
                  </Link>
                </div>
    </form>
</div>
  )
}

export default Login;
