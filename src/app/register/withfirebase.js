'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { auth, database } from '@/component/Firebase/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const RoleRegister1 = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const router = useRouter()
    const handlechange = (e) => {
        setEmail(e.target.value);
    }
    const handleRoleChange = (event) => {
        setRole(event.target.value);
        console.log("Selected role:", event.target.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setIsSigningUp(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, 'password');

            // Send email verification

            await sendEmailVerification(userCredential.user);

            const verificationTimeout = 60000; // 60 seconds
            const startTime = Date.now();
            while (!userCredential.user.emailVerified && (Date.now() - startTime < verificationTimeout)) {
                // Wait for 1 second before checking again
                console.log("call");
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Refresh user data to check email verification status
                await userCredential.user.reload();
            }
    
            // Check if email is verified
            if (userCredential.user.emailVerified) {
                // Store user with role in Realtime Database
                const userRef = ref(database, 'users/' + userCredential.user.uid);
                await set(userRef, {
                    email,
                    role
                });
    
                toast.success("User registered successfully");
                router.push('/login', { scroll: false });
            } else {
                throw new Error('Email verification timed out');
            }

        } catch (error) {
            setIsSigningUp(false);
           toast.error(error.code);
        }

    }
    return (
        <div className='w-full h-screen flex items-center'>
        <div className="m-10 sm:mx-auto sm:w-full sm:max-w-sm p-10 bg-slate-300 rounded">
            <h1 className='text-blue-800 '>Register User</h1>
            <form className="space-y-6" action="#" method="POST" onSubmit={(e) => { handleRegister(e) }}>
                <div className="mt-2">
                    <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={handleRoleChange}
                        className="block w-full rounded-md border-2 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
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
                            className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>



                <div>
                    <button
                        type="submit"
                        className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isSigningUp ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                        // className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                        disabled={isSigningUp}
                    >
                        Sign up
                    </button>
                </div>
                <div className="text-sm">
                    user registered?
                    <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        login user
                    </Link>
                </div>
            </form>
        </div>
        </div>
    )
}

export default RoleRegister1;
