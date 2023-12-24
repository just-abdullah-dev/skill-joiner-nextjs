import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Package from '@/models/package';

const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        return reqMethodError(res, 'PUT');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);

        const { id, title, price, time, desc } = req.body;

        let pkg = await Package.findById(id);

        pkg.title = title || pkg.title;
        pkg.desc = desc || pkg.desc;
        pkg.price = price || pkg.price;
        pkg.time = time || pkg.time;
        
        await pkg.save();

        res.status(201).json({
            success: true,
            message: 'Package has been updated to user service.',
            data: pkg
        });


    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
