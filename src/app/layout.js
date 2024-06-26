'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./component/protected/protectedRoute";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from "next/link";
// import Login from "./login/page";
// import Register from "./register/page";

// code optamization is lazy-loading
const WithCustomLoading = dynamic(
  () => import('./component/Reuseable/loading'),
  {
    loading: () => <p >Loading...</p>,
  }
)

const DynamicLogin = dynamic(() => import('./auth/login/page'), {
  loading: () => <WithCustomLoading />,
});

const DynamicRegister = dynamic(() => import('./auth/register/page'), {
  loading: () => <WithCustomLoading />,
});

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  const [isAuth, setIsAuth] = useState(typeof window !== 'undefined' && sessionStorage.getItem('jwt'));
  const router = useRouter()

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedToken = sessionStorage.getItem('jwt');
      setIsAuth(!!updatedToken);
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuth(true);
  };
  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    setIsAuth(false); // Update the authentication status when the user logs out
    router.push('/auth/login')
  };


  const pathname = usePathname()


  return (
    <html lang="en">
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTDNEpUTHQoQUJMHLrErGJyHg89uy71MyuH5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />

      </Head>
      <body className={`${inter.className } h-screen w-full sm:overflow-hidden`}>
        <ToastContainer />
        {isAuth &&
          <div>
            <Navbar isAuth={isAuth} onlogout={handleLogout} />

            <div className="flex">



              <div className="bg-gray-600  h-screen w-[15%] lg:flex hidden">
                <div className='md:flex hidden flex-col w-full p-2'>
                  <li className='hover:bg-white p-2 rounded flex'>
                    <Link href='/add' className="w-full">Add User</Link>
                  </li>
                  <li className='hover:bg-white p-2 rounded flex'>
                    <Link href='/user-list' className="w-full">Display User</Link>
                  </li>
                  <li className='hover:bg-white p-2 rounded flex'>
                    <Link href='/import-file' className="w-full">Upload EXCEL</Link>
                  </li>
                  <li className='hover:bg-white p-2 rounded flex' onClick={handleLogout}>
                    <Link href='/role-login' className=' w-full'>Logout</Link>
                  </li>
                </div>
              </div>
              <div className="sm:overflow-x-hidden sm:h-[95vh]  sm:w-full  ">

                {isAuth && children}
              </div>
            </div>
          </div>
        }
        <div className="w-full">
          {/* <ProtectedRoute> */}

          {/* </ProtectedRoute> */}
        </div>

        {!isAuth && pathname !== '/auth/register' && <DynamicLogin onLoginSuccess={handleLoginSuccess} />}
        {!isAuth && pathname !== '/auth/login' && <DynamicRegister />}


      </body>
    </html>
  );
}
