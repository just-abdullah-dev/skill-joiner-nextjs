import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import Country from '@/models/country';

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
        const country = await Country.create({
            name, slug, possibleNames
        });

        res.status(201).json({
            success: true,
            message: `${country.name} has been added to country list.`,
            data: country
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
