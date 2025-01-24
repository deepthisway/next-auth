import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

// connect to DB;

  connect();

export async function POST(request: NextRequest)    {
    try {
        const reqBody = await request.json();   // returns a promise, so put await;
        const {token} =reqBody;
        console.log("token is: ", token);
        
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user)   {
            return NextResponse.json({
                status: 400,
                message: "Invalid token!!",
            })
        }

        // console.log("user is: ", user);
        
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;


        await user.save();  // dont forget to put await;
        
        return NextResponse.json({
            msg: "User verified successfully!!",
            success: true,
            
        }, {status: 201})

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Error is verification!!",
        })
    }
}