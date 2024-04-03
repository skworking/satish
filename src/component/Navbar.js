'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { BsBrilliance, BsJustify, BsXSquare } from 'react-icons/bs';

const NavList = ({ isAuth, onlogout, setView, view }) => {
    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        onlogout()
    };
    // const handlechange = (e) => {
    //     e.preventDefault()
    //     console.log("call");
    //     setView(!view)
    // }
    return (
        <ul className='flex gap-2  '>
            {isAuth ? (
                <>
                    <React.Fragment className='sm:flex hidden '>
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
                    </React.Fragment>
                    {view ?
                        <BsXSquare className='flex sm:hidden w-[60px] h-[40px] cursor-pointer' onClick={setView} />
                        :
                        <BsJustify className='flex sm:hidden w-[60px] h-[40px] cursor-pointer' onClick={setView} />
                    }

                </>
            ) : (
                <li className='hover:bg-white p-2 rounded'>
                    <Link href='/login' className='p-2'>Login</Link>
                </li>
            )}
        </ul>
    );
};

const Navbar = ({ isAuth, onlogout }) => {
    const [view, setView] = useState(false);
    const handlechange = (e) => {
        e.preventDefault()
        console.log("call");
        setView(!view)
    }
    return (
        <div className='flex w-full sm:justify-around justify-between h-[50px] py-2 items-center bg-slate-500'  >
            {!isAuth ?
                <BsBrilliance className='fill-red-200 w-[60px] h-[40px]' />
            :
            <Link href='/'>
                <BsBrilliance className='fill-red-200 w-[60px] h-[40px]' />
            </Link>
            }
            <NavList isAuth={isAuth} onlogout={onlogout} view={view} setView={handlechange} />
            {view &&
                <div className='absolute h-full  list-inside bg-gray-300 w-full top-12 flex flex-col sm:hidden' onClick={handlechange}>
                    <li className='hover:bg-white p-2 rounded'>
                        <Link href='/add' >
                            Add User
                        </Link>
                    </li>
                    <li className='hover:bg-white p-2 rounded'>
                        <Link href='/user-list'>
                            Display User
                        </Link>
                    </li>
                    <li className='hover:bg-white p-2 rounded'>
                        <Link href='/import-file'>
                            Upload EXCEL
                        </Link>
                    </li>
                    <li className='hover:bg-white p-2 rounded' onClick={onlogout}>
                        <Link href='/login' className='p-2'>
                            Logout
                        </Link>
                    </li>
                </div>
            }
        </div>
    );
};

export default Navbar;
