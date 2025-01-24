import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// connect to DB;

  connect();


  export async function POST(request : NextRequest)  {

    try {
        const response = NextResponse.json({
            msg: "Logged out succesfully",
            success:  true
        })

        response.cookies.set('token', "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Error is verification!!",
        })
    }
  }

