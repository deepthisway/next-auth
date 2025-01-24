import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export const getUserId = (request: NextRequest)=> {

    try {
        console.log("Entered token fxn");
        
        const token : any = request.cookies.get('token')?.value;
        const decodedToken : any = jwt.verify(token, process.env.TOKEN_SECRET!) || "";

        if(!decodedToken)    {
            return null;
        }
        console.log("decoded token is: ", decodedToken);
        
        return decodedToken.id;

    } catch (error) {
        return NextResponse.json({
            error,
            msg: "Error in token"
        })
    }
} 