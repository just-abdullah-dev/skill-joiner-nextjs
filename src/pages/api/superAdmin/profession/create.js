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
        // await adminAuthGuard(req, res);
        // if(!req.user?._id){
        //     return;
        // }
        
        const { name, slug, possibleNames } = req.body;
        const profession = await Profession.create({
            name, slug, possibleNames
        });

        res.status(201).json({
            success: true,
            message: `${profession.name} has been added to profession collection successfully`,
            data: profession
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
