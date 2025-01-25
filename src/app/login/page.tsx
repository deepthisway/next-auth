"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Link from "next/link";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      console.error("Login failed!!", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Monitor login button disable/enable state
  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-4 border-2 border-gray-300 shadow-lg rounded-lg bg-white w-1/3 p-6">
        <h1 className="text-2xl font-bold text-center">
          {loading ? "Processing..." : "Login"}
        </h1>

        <form onSubmit={onLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
            <input
              className="text-gray-900 border border-gray-400 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
            <input
              className="text-gray-900 border border-gray-400 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className={`p-2 border rounded-lg w-1/4 ${
                buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={buttonDisabled}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                  Please wait...
                </span>
              ) : "Login"}
            </button>
          </div>
        </form>

        <Link href="/signup" className="text-blue-500 text-center hover:underline">
          Visit sign-up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
