import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import FAQ from '@/models/faq';

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
        const faq = await FAQ.findByIdAndDelete(id);
        if(!faq){
            return errorHandler(res, 404, "FAQ was not found.")
        }
        res.json({
            success: true,
            message: "Question has been deleted successfully."
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
