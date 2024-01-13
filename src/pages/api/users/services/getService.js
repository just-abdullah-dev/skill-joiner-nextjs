import connectDB from "@/config/db";
import errorHandler from "@/middleware/errorHandler";
import { mediaUploadMiddleware } from "@/middleware/mediaUploadMiddleware";
import { reqMethodError } from "@/utils/reqError";
import { userAuthGuard } from "@/middleware/userMiddlewares";
import Service from "@/models/service";
import Package from "@/models/package";
import User from "@/models/user";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return reqMethodError(res, "GET");
  }
  try {
    await connectDB();
    const { id } = req.query;
    const service = await Service.findById(id).populate(['packages','skills','profession']);
    if (!service) {
      return errorHandler(res, 404, "Service was not found.");
    }
    res.status(200).json({
      success: true,
      message: "Service Data",
      data: service,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return errorHandler(res, 500, error.message);
  }
};

export default handler;
