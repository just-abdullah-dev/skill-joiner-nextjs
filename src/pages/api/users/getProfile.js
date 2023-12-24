import connectDB from "@/config/db";
import errorHandler from "@/middleware/errorHandler";
import { userAuthGuard } from "@/middleware/userMiddlewares";
import User from "@/models/user";
import { reqMethodError } from "@/utils/reqError";
import Profession from "@/models/profession";
import Project from "@/models/project";
import Review from "@/models/reviews";
import Skill from "@/models/skills";
import Education from "@/models/education";
import Language from "@/models/languages";

export default async function handler(req, res) {
    try {
        if(req.method !== 'GET'){
            return reqMethodError(res, 'GET');
        }
        
        await connectDB();

        await userAuthGuard(req, res);

        const user = await User.findById(req.user?._id)
      .select('-password')
      .populate([
        {
          path: 'profession',
        },
        {
          path: 'languages',
        },
        {
          path: 'reviews',
        },
        {
          path: 'skills',
        },
        {
          path: 'education',
        },
        {
          path: 'portfolio',
        },
        {
          path: 'services',
          populate:[
            {
              path: 'packages'
            }
          ]
        },
      ]);


        if (user) {
            
            res.status(200).json({
                success: true,
                data:user,
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