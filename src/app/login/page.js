'use client'
import React,{useEffect} from 'react'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({onLoginSuccess}) => {
    const router = useRouter()
    useEffect(() => {
      // Check if token exists in sessionStorage
      const token = typeof window !== 'undefined' && sessionStorage.getItem('jwt')
      if (token) {
          // Redirect authenticated users to another page
          router.push('/'); // Change '/dashboard' to the desired page
      }
  }, []);
    const handleSubmit=async(event)=> {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        console.log(email,password);
        const response = await axios.post('/api/login', { email, password });
        console.log(response);
        if(response.data.success){
          sessionStorage.setItem("jwt",response.data.token)
          toast.success("login success")
          onLoginSuccess(); 
  
        }else{
          toast.warning(response.data.message)
        }
        
      }
    
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-2">
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
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
