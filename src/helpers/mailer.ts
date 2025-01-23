import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs';
import User from '@/models/userModel';

export const sendEmail = async({email, emailType, userId} : any) => {

    try {
            // generate a hashed token to send to db and user email, so that taht can be matched and verified
            const hashedToken = await bcrypt.hash(userId.toString(), 10);

            // send that to db
            if(emailType === "VERIFY")  {
                await User.findByIdAndUpdate(userId, 
                    {verifyToken: hashedToken, 
                    verifyTokenExpiry:Date.now() + 3600000
                    }
                )
            } 
            else if(emailType === "RESET")   {
                await User.findByIdAndUpdate(userId, 
                    {forgotPasswordToken: hashedToken, 
                    forgotPasswordTookenExpiry:Date.now() + 3600000
                    }
                )
            }
            function hello(){

            }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "cdc7b162595d40", // should not be here
            pass: "4c1bc69f2f24ea" // should not be here
            }
        });

        const mailOptions = {
            from: 'deep@email.hello',
            to: email,
            subject: emailType === 'reset' ? 'Reset Password' : 'Verify Email',
            text: emailType === 'reset' ? 'Reset Password' : 'Verify Email',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType == "VERIFY" ? "Verify your Email" : "Reset your password"} 
            or copy and paste the link to your browser.
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;


    } catch (error : any) {
        
    }
}