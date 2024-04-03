'use client'
import { useRouter } from 'next/navigation'
// import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ProtectedRoute = ({children}) => {
    const router=useRouter();
    const [token, setToken] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt') );

    useEffect(()=>{
    // const token = sessionStorage.getItem('jwt');
    if (!token) {
      // redirect('/login')
      router.push('/login');
    }
    
    },[])
  return <>{children}</>
  
}

export default ProtectedRoute;
