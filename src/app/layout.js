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
// import Login from "./login/page";
// import Register from "./register/page";

// code optamization is lazy-loading
const WithCustomLoading = dynamic(
  () => import('./component/Reuseable/loading'),
  {
    loading: () => <p >Loading...</p>,
  }
)

const DynamicLogin = dynamic(() => import('./login/page'), {
  loading: () => <WithCustomLoading />,
});

const DynamicRegister = dynamic(() => import('./register/page'), {
  loading: () => <WithCustomLoading />,
});

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  console.log("change", children);
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
    router.push('/login')
  };


  const pathname = usePathname()


  return (
    <html lang="en">
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTDNEpUTHQoQUJMHLrErGJyHg89uy71MyuH5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />

      </Head>
      <body className={inter.className}>
        <ToastContainer />
        <Navbar isAuth={isAuth} onlogout={handleLogout} />
        <ProtectedRoute>
          {isAuth && children}

        </ProtectedRoute>
        {!isAuth && pathname !== '/register' && <DynamicLogin onLoginSuccess={handleLoginSuccess} />}
        {!isAuth && pathname !== '/login' && <DynamicRegister />}
    
   
      </body>
    </html>
  );
}
