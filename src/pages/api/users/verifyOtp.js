import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import User from '@/models/user';

export default async function handler (req, res){
    try {
        if(req.method !== 'POST'){
            return reqMethodError(res, 'POST');
        }

        const { email, otp } = req.body;
        if(!otp || !email){
            return errorHandler(res, 400, "Please fill all fields.");
        }
        await connectDB();

        let user = await User.findOne({email});
        if(!user){
            return errorHandler(res, 400, "User was not found.");
        }

        if(user.otpCode != otp){
            return errorHandler(res, 400, "Wrong OTP Code, Verification failed.");
        }

        const updatedUser = await User.findOneAndUpdate(
            { email }, 
            { $set: { otpCode: 0, isVerified: true } }, 
            { new: true } 
          );

        return res.status(201).json({
            status: true,
            name: updatedUser.name,
            email:updatedUser.email,
            avatar:updatedUser.avatar,
            username: updatedUser.username,
            profession:updatedUser.profession,
            student:updatedUser.student,
            country:updatedUser.country,
            about:updatedUser.about,
            bio:updatedUser.bio,
            _id:updatedUser._id,
            isVerified: updatedUser.isVerified,
            createdAt: updatedUser.createdAt,
            updatedAt:updatedUser.updatedAt,
            token: await updatedUser.generateJWT(),
        })
    } catch (error) {
        errorHandler(res, 500, {
            name: error.name,
            message: error.message,
        });
    }
}
