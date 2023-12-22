import connectDB from "@/config/db";
import errorHandler from "@/middleware/errorHandler";
import { userAuthGuard } from "@/middleware/userMiddlewares";
import User from "@/models/user";
import { reqMethodError } from "@/utils/reqError";

export default async function handler(req, res) {
    try {
        if(req.method !== 'GET'){
            return reqMethodError(res, 'GET');
        }
        
        await connectDB();

        await userAuthGuard(req, res);

        const user = await User.findById(req.user._id);
        if (user) {
            
            res.status(200).json({
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
                isVerified: user.isVerified,
                createdAt: user.createdAt,
                updatedAt:user.updatedAt,
            })
        } else {
            return errorHandler(res, 404, "User not found.");
        }
    } catch (error) {
        errorHandler(res, 400, {
            name: error.name,
            message: error.message,
        });
    }
}