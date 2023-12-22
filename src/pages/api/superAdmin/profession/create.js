import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import Profession from '@/models/profession';

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
        
        const { name, slug } = req.body;
        const profession = await Profession.create({
            name, slug
        });

        res.status(201).json({
            success: true,
            data: profession,
            message: `${profession.name} has been added to profession collection successfully`
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
