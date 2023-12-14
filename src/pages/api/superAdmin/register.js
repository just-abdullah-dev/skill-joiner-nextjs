import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import SuperAdmin from '@/models/superAdmin';
import { sendOtp } from '@/utils/sendOtp';

export default async function handler (req, res){
    try {
        if(req.method !== 'POST'){
            return reqMethodError(res, 'POST');
        }

        const { name, password, email, username } = req.body;
        if(!name || !email || !password || !username){
            return errorHandler(res, 400, "Please fill all fields.");
        }
        await connectDB();

        let admin = await SuperAdmin.findOne({email});
        if(admin){
            return errorHandler(res, 400, "Email is already registered.")
        }

        const otp = sendOtp(email);
        
        admin = await SuperAdmin.create({
            name,
            email,
            password,
            username,
            otpCode: otp,
        });
        
        return res.status(201).json({
            status: true,
            name: admin.name,
            email:admin.email,
            avatar:admin.avatar,
            username: admin.username,
            _id:admin._id,
            isVerified: admin.isVerified,
            createdAt: admin.createdAt,
            updatedAt:admin.updatedAt,
            token: await admin.generateJWT(),
        })
        
    } catch (error) {
        errorHandler(res, 500, {
            name: error.name,
            message: error.message,
        });
    }
}
