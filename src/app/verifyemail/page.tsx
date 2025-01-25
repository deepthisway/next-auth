'use client'
import axios from 'axios';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const verifyToken = () => {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    // const router = useRouter(); // to take out all the params, use can use next/router
    // now we just need to take out token from the url and pass it to the body to verify it!!
    // extract token
    useEffect(()=>  {
        // traditional JS way
        const urlToken = window.location.search.split("=")[1] // we have splitted the token in url by =; check mailer.ts
        setToken(urlToken);

        // Next JS way to get params
        // const {query} = router;
        // const urlToken2 = query.token;      // token is the name given to parram by us
        // setToken(urlToken2)
        }, [])

    const verifyUser = async ()=>   {
        try {
            await axios.post("/api/users/verifyemail" , {token})
            setVerified(true)
            setError(false)
        } catch (error: any) {
            setError(true)
            toast.error(error)
            console.log("Error in verifying token");
        }
    }
    if(token.length > 0)    {
        verifyUser();
    }

  return <>
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-8">
    <div className="flex flex-col gap-4 border-2 border-gray-300 shadow-lg rounded-lg bg-white w-full p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Verify Email</h1>
  
      <h2 className="text-lg font-medium text-gray-600">
        Token: 
        <span className={`ml-2 font-semibold ${token ? "text-blue-600" : "text-red-500"}`}>
          {token ? token : "No Token"}
        </span>
      </h2>
  
      {verified && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg">
          <h1 className="text-xl font-semibold">Account Verified</h1>
        </div>
      )}
  
      {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg">
          <h1 className="text-xl font-semibold">Account Not Verified</h1>
        </div>
      )}
    </div>
    <Link href="/login">Login</Link>
  </div>
      </>
}


export default verifyToken;

