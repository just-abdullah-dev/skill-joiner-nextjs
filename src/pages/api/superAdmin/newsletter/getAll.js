import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import Newsletter from '@/models/newsletter';

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        return reqMethodError(res, 'GET');
    }
    try {
        await connectDB();
        await adminAuthGuard(req, res);
        if(!req.user?._id){
            return;
        }

        const emails = await Newsletter.find({})

        res.status(201).json({
            success: true,
            message: 'All emails\'s.',
            data: emails,
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
