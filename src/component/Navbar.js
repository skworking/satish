'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import { BsBrilliance } from "react-icons/bs";

const NavList = () => {
    const [isAuth, setAuth] = useState(typeof window !== 'undefined' ? localStorage.getItem('key') : null);
    return (
        <>
            <ul className='flex gap-2' >
                {isAuth ? (<>
                    <li className='hover:bg-white p-2 rounded'>
                        <Link href={'/add'} className='p-2'>Add USer</Link>
                    </li>
                    <li className='hover:bg-white p-2 rounded'>
                        <Link href={'/user-list'} className='p-2'>
                            Display USer
                        </Link>
                    </li>
                    <li className='hover:bg-white p-2 rounded'>
                        <Link href={'/excel-list'} className='p-2'>
                            Exel-CSV
                        </Link>
                    </li>
                    <li className='hover:bg-white p-2 rounded'>
                        <Link href={'/import-file'} className='p-2'>
                            Upload EXCEL
                        </Link>
                    </li>
                </>) :
                    (
                        <>
                            <li className='hover:bg-white p-2 rounded'>
                                <Link href={'/login'} className='p-2'>
                                    Login
                                </Link>
                            </li>
                            
                        </>
                    )}
            </ul>
        </>
    )
}
const Navbar = () => {
    return (
        <div className='flex w-full  justify-around h-[50px] py-2 items-center bg-slate-500'>
            <Link href='/'>
                <BsBrilliance className='fill-red-200 w-[60px] h-[40px]' />
            </Link>
            <NavList />
        </div>
    )
}

export default Navbar;
