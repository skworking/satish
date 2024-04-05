import Link from 'next/link';
import React, { useState } from 'react'
import { auth,storage } from '@/component/Firebase/firebase';
import  {createUserWithEmailAndPassword,sendEmailVerification}  from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore'; 

const RoleRegister = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const handlechange=(e)=>{
        setEmail(e.target.value);
    }
    const handleRoleChange = (event) => {
        setRole(event.target.value);
        console.log("Selected role:", event.target.value); 
    };
 
    const handleRegister=async(e)=>{
        e.preventDefault();
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, 'password');

            // Send email verification
            await sendEmailVerification(userCredential.user);
    
            // Store user with role in Firestore
            

            // await setDoc(doc(storage, 'users', userCredential.user.uid), {
            //     email,
            //     role
            // });
        }catch(err){
            console.log("error",err);
        }
        // createUserWithEmailAndPassword(auth, email, 'password')
        // .then((userCredential) => {
        //     const user = userCredential.user;
        //     // console.log(user);
        //     sendEmailVerification(user)
        //     .then((res)=>{
        //         console.log(res);
        //     })

        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(error);
        // });
       
    }   
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-2">
    <form className="space-y-6" action="#" method="POST" onSubmit={(e)=>{handleRegister(e)}}>
        <div className="mt-2">
            <select
                id="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
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
                    required
                    className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>

       

        <div>
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
  )
}

export default RoleRegister;
