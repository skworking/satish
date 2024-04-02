'use client'
import React,{useState} from 'react'
import Link from 'next/link'
const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const data ={
            email:email,
            password:password
        }
        console.log(data);
    }
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handlechange=(e)=>{
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(e.target.value === password);
      };
    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
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
                            // autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                           confirm Password
                        </label>

                    </div>
                    <div className="mt-2">
                        <input
                           id="confirmPassword"
                           name="confirmPassword"
                           type="password"
                            // autoComplete="current-password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    {!passwordsMatch && (
                    <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                    )}
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

export default Register;
