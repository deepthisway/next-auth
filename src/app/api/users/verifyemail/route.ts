import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

// connect to DB;

  connect();

export async function POST(request: NextRequest)    {
    try {
        const reqBody = await request.json();
        const {token} =reqBody;
        console.log("token is: ", token);
        
        const user = User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user)   {
            return Response.json({
                status: 400,
                message: "Invalid token!!",
            })
        }

        console.log("user is: ", user);
        
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;


        await user.save();  // dont forget to put await;

        return Response.json({
            msg: "User verified successfully!!",
            success: true,
            
        }, {status: 201})

    } catch (error) {
        return Response.json({
            status: 500,
            message: "Error is verification!!",
        })
    }
}