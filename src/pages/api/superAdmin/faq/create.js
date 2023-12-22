import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import FAQ from '@/models/faq';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return reqMethodError(res, 'POST');
    }
    try {
        await connectDB();
        await adminAuthGuard(req, res);
        if(!req.user?._id){
            return;
        }
        const { question, answer } = req.body;
        const faq = await FAQ.create({
            question, answer
        });

        res.status(201).json({
            success: true,
            data: faq,
            message: 'Question has been added to faq collection successfully'
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
