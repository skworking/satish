'use client'
import React from 'react';
import Link from 'next/link';
import { BsBrilliance } from 'react-icons/bs';

const NavList = ({ isAuth ,onlogout}) => {
    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        onlogout()
    };

    return (
        <ul className='flex gap-2'>
            {isAuth ? (
                <>
                    <li className='hover:bg-white p-2 rounded'>
                        <Link href='/add'>Add User</Link>
                    </li>
                    <li className='hover:bg-white p-2 rounded'>
                        <Link href='/user-list'>Display User</Link>
                    </li>
                    <li className='hover:bg-white p-2 rounded'>
                        <Link href='/import-file'>Upload EXCEL</Link>
                    </li>
                    <li className='hover:bg-white p-2 rounded' onClick={handleLogout}>
                        <Link href='/login' className='p-2'>Logout</Link>
                    </li>
                </>
            ) : (
                <li className='hover:bg-white p-2 rounded'>
                    <Link href='/login' className='p-2'>Login</Link>
                </li>
            )}
        </ul>
    );
};

const Navbar = ({isAuth,onlogout}) => {
  
    return (
        <div className='flex w-full justify-around h-[50px] py-2 items-center bg-slate-500'>
            <Link href='/'>
                <BsBrilliance className='fill-red-200 w-[60px] h-[40px]' />
            </Link>
            <NavList isAuth={isAuth} onlogout={onlogout}/>
        </div>
    );
};

export default Navbar;
