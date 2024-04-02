'use client'
import { useRouter } from 'next/navigation'
// import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const ProtectedRoute = ({children}) => {
    const router=useRouter();
    useEffect(()=>{
    const token = localStorage.getItem('jwt');
    if (!token) {
        // redirect('/login')
      router.push('/login');
    }
    },[])
  return <>{children}</>
  
}

export default ProtectedRoute;
