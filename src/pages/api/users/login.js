import connectDB from "@/config/db";
import errorHandler from "@/middleware/errorHandler";
import User from "@/models/user";
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
        
        let user = await User.findOne({ email })
        if (!user) {
            return errorHandler(res, 400, "Email is not registered.");
        } else {
            if (await user.comparePassword(password)) {
                res.status(200).json({
                    success: true,
                    message: "Logged in successfully.",
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
                    skills: user.skills,
                    education: user.education,
                    languages: user.languages,
                    isVerified: user.isVerified,
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