import connectDB from "@/config/db";
import errorHandler from "@/middleware/errorHandler";
import { reqMethodError } from "@/utils/reqError";
import JobPost from "@/models/jobPost";
import User from "@/models/user";
import Skill from '@/models/skills';
import Profession from "@/models/profession";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return reqMethodError(res, "GET");
  }
  try {
    await connectDB();
    const { id } = req.query;
    const jobPost = await JobPost.findById(id).populate([
      {
        path: 'user',
        select: 'avatar name username bio about',
      },
      {
        path: 'skills',
      },
      {
        path: 'freelancer',
      },
      {
        path: 'category',
      },
    ]);
    if (!jobPost) {
      return errorHandler(res, 404, "Job was not found.");
    }
    res.status(200).json({
      success: true,
      message: "Job Post Data",
      data: jobPost,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return errorHandler(res, 500, error.message);
  }
};

export default handler;
