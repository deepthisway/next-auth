import { connect } from "@/dbConfig/dbConfig";
import {getUserId} from "@/helpers/getUserId";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request : NextRequest)  {

    try {
        //get userID;
        const userId = getUserId(request);
        console.log("user Id is: ", userId);
        
        //get user data
        const userData = await User.findOne({_id: userId}).select("-password");

        if(!userData)   {
            return NextResponse.json({
                message: "User not found",
            })
        }

        return NextResponse.json({
            mmsg: "User found",
            user: userData,
        })
        
    } catch (error) {
        return NextResponse.json({
            error,
            msg: "problem in getting the user"
        })
    }
}