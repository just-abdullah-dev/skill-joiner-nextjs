import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import Newsletter from '@/models/newsletter';

const handler = async (req, res) => {
    if (req.method !== 'DELETE') {
        return reqMethodError(res, 'DELETE');
    }
    try {
        await connectDB();
        await adminAuthGuard(req, res);
        if(!req.user?._id){
            return;
        }
        const { id } = req.query;
        const newsletter = await Newsletter.findByIdAndDelete(id);
        if(!newsletter){
            return errorHandler(res, 404, "This email is not in newsletter list.")
        }
        res.json({
            success: true,
            message: "Email has been removed successfully."
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
