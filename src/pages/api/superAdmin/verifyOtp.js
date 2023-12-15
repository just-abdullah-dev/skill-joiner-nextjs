import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import SuperAdmin from '@/models/superAdmin';

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

        let admin = await SuperAdmin.findOne({email});
        if(!admin){
            return errorHandler(res, 400, "User was not found.");
        }

        if(admin.otpCode != otp){
            return errorHandler(res, 400, "Wrong OTP Code, Verification failed.");
        }

        const updatedAdmin = await SuperAdmin.findOneAndUpdate(
            { email }, 
            { $set: { otpCode: 0 } }, 
            { new: true } 
          );

        return res.status(201).json({
            status: true,
            name: updatedAdmin.name,
            email:updatedAdmin.email,
            avatar:updatedAdmin.avatar,
            username: updatedAdmin.username,
            _id:updatedAdmin._id,
            createdAt: updatedAdmin.createdAt,
            updatedAt:updatedAdmin.updatedAt,
            token: await updatedAdmin.generateJWT(),
        })
    } catch (error) {
        errorHandler(res, 500, {
            name: error.name,
            message: error.message,
        });
    }
}
