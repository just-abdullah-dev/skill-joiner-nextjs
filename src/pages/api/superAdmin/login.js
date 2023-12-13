import connectDB from "@/config/db";
import errorHandler from "@/middleware/errorHandler";
import SuperAdmin from "@/models/superAdmin";
import { reqMethodError } from "@/utils/reqError";

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
        
        //Checking whether user exists or not
        let user = await SuperAdmin.findOne({ email })
        
        if (!user) {
            return errorHandler(res, 400, "Email is not registered.");
        } else {
            const isPassword = await user.comparePassword(password);
            if (isPassword) {
                const otp = sendOtp(email);
                
                res.status(201).json({
                    success: true,
                    message: "Logged in successfully.",
                    name: user.name,
                    email:user.email,
                    avatar:user.avatar,
                    username: user.username,
                    _id:user._id,
                    createdAt: user.createdAt,
                    updatedAt:user.updatedAt,
                    token: await user.generateJWT(),
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