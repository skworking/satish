'use client'
import { useRouter } from 'next/navigation'
// import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ProtectedRoute = ({children}) => {
    const router=useRouter();
    const [token, setToken] = useState( sessionStorage.getItem('jwt') );
    useEffect(()=>{
    // const token = sessionStorage.getItem('jwt');
    if (!token) {
      // redirect('/login')
      router.push('/login');
      // const handleStorageChange = () => {
      //     setAuth(!!sessionStorage.getItem('jwt'));
      // };
      // window.addEventListener('storage', handleStorageChange);
  
      // // Clean up listener
      // return () => {
      //   window.removeEventListener('storage', handleStorageChange);
      // };
     
    }
    
    },[])
  return <>{children}</>
  
}

export default ProtectedRoute;
