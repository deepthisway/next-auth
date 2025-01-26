'use client'

import axios from 'axios';
import { log } from 'console';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
    const router = useRouter();
    const [user, setUser] = useState("Nothing");
    const getData = async ()=>  {
        const response = await axios.get('/api/users/me');
        // console.log("User data is: ", response.data.user);
        setUser(response.data.user._id);
    }
    useEffect(()=>  {
        getData();
    }, [])
    // console.log("user is: ", user);
    
    const logout = async ()=>   {
        try {
            await axios.post('/api/users/logout')
            console.log("Logged out");
            router.push('/login')
            
        } catch (error) {
            console.log("error Logged out");
            
        }
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        {(user === "Nothing" ? "Nothing Available" : <div className='flex flex-col items-center justify-center border-4 rounded-lg p-4'>
            <h1 className='bg-red-500 border-2 p-2 shadow-sm rounded-lg'>Profile Page</h1>
            <Link className='bg-green-500 border-2 p-2 shadow-sm rounded-lg' href={`/profile/${user}`}>Click Here to access MONGO-ID of user.</Link>
            <button className='bg-black text-white border-2 p-2 shadow-sm rounded-lg' onClick={logout}>Logout</button>
        </div> )}
    </div>
  )
}

export default ProfilePage