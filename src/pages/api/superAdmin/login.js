import connectDB from "@/config/db";
import errorHandler from "@/middleware/errorHandler";
import SuperAdmin from "@/models/superAdmin";
import { reqMethodError } from "@/utils/reqError";
import { sendOtp } from "@/utils/mail/sendOtp";

export default async function handler(req, res){
    try {
        if(req.method !== 'POST'){
            return reqMethodError(res, 'POST');
        }

        const { password, email } = req.body;
        if(!email || !password){
            return errorHandler(res, 400, "Please fill all fields.");
        }
        
        await connectDB();
        
        let admin = await SuperAdmin.findOne({ email })
        
        if (!admin) {
            return errorHandler(res, 400, "Email is not registered.");
        } else {
            if (await admin.comparePassword(password)) {
                const otp = sendOtp(email);
                const updatedAdmin = await SuperAdmin.findOneAndUpdate(
                    { email }, 
                    { $set: { otpCode: otp } }, 
                    { new: true } 
                  );

                res.status(200).json({
                    success: true,
                    message: "Enter OTP code for verification.",
                    email:updatedAdmin.email,
                });
            } else {
                return errorHandler(res, 400, "Password is incorrect.");
            }
        }
    } catch (error) {
        errorHandler(res, 400, {
            name: error.name,
            message: error.message,
        });
    }
}