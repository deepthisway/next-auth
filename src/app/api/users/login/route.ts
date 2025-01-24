import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// connect to DB;

connect();

export async function POST(request : NextRequest)   {

    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        
        // fetch in db

        const user = await User.findOne({email});
        if(!user)   {
            return NextResponse.json({
                msg: "User does not exist"
            })
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword)  {
            return NextResponse.json({
                msg: "Invalid password"
                })
        }
        
        // sign wiht jwt
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: '1d'
        })


        // new method to send response
        const response = NextResponse.json({
            msg: "User logged in",
            token

        })
        // return it after setting the cookie

        response.cookies.set('token', token, {
            httpOnly: true // It means that now only server can manipulate the cookie, User can see but can’t change it.
        });

        return response;


    } catch (error) {
        return NextResponse.json({
            msg: "Error in logging-in"
        }, {status: 500})
    }
}