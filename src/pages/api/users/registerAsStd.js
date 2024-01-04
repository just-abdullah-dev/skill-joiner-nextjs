import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import User from '@/models/user';
import RegNum from '@/models/stdRegNum';
import Blacklist from '@/models/blacklist';
import { sendOtp } from '@/utils/mail/sendOtp';

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
        
        let blacklist = await Blacklist.findOne({email: email});
        if(blacklist){
            return errorHandler(res, 400, "Email was found in blacklist.")
        }

        let user = await User.findOne({email});
        if(user){
            return errorHandler(res, 400, "Email is already registered.")
        }

        let regNum = await RegNum.findOne({ number: username });
        if(!regNum){
            return errorHandler(res, 400, `${username} was not found in registered uni emails.`)
        }

        const otp = sendOtp(email);
        
        user = await User.create({
            name,
            email,
            password,
            username,
            student: true,
            otpCode: otp,
        });
        
        return res.status(201).json({
            success: true,
            name: user.name,
            email:user.email,
            avatar:user.avatar,
            username: user.username,
            profession:user.profession,
            student:user.student,
            country:user.country,
            about:user.about,
            bio:user.bio,
            _id:user._id,
            languages: user.languages,
            isVerified: user.isVerified,
            skills: user.skills,
            education: user.education,
            createdAt: user.createdAt,
            updatedAt:user.updatedAt,
            token: await user.generateJWT(),
        })
        
    } catch (error) {
        errorHandler(res, 500, {
            name: error.name,
            message: error.message,
        });
    }
}
