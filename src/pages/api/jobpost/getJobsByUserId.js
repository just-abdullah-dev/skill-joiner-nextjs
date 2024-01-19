import connectDB from "@/config/db";
import errorHandler from "@/middleware/errorHandler";
import { reqMethodError } from "@/utils/reqError";
import JobPost from "@/models/jobPost";
import { userAuthGuard } from '@/middleware/userMiddlewares';
import User from "@/models/user";
import Skill from '@/models/skills';
import Profession from "@/models/profession";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return reqMethodError(res, "GET");
  }
  try {
    await connectDB();
    await userAuthGuard(req, res);
    const posts = await JobPost.find({user:req.user?._id});
    
    res.status(200).json({
      success: true,
      message: "All user Job Posts Data",
      data: posts,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return errorHandler(res, 500, error.message);
  }
};

export default handler;
