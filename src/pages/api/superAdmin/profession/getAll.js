import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import Profession from '@/models/profession';

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
        const profession = await Profession.find({})

        res.status(201).json({
            success: true,
            message: 'All profession\'s.',
            data: profession,
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
