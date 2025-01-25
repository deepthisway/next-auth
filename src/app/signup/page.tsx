"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Link from "next/link";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "", 
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.log("Sign Up failed!!", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Monitor signup button disable/enable state
  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-4 border-2 border-gray-300 shadow-lg rounded-lg bg-white w-1/3 p-6">
        <h1 className="text-2xl font-bold text-center">
          {loading ? "Processing..." : "Sign Up"}
        </h1>
        
        <label htmlFor="username" className="text-gray-700 font-medium">Username</label>
        <input
          className="text-gray-900 border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="username"
          placeholder="Enter your username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />

        <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
        <input
          className="text-gray-900 border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          id="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />

        <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
        <input
          className="text-gray-900 border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          id="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />

        <div className="flex flex-col items-center">
          <button
            className={`p-2 border rounded-lg w-1/4 ${
              buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={onSignup}
            disabled={buttonDisabled}
          >
            {loading ? "Please wait..." : "Sign Up"}
          </button>
        </div>
        <Link href="/login">Visit Login</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
