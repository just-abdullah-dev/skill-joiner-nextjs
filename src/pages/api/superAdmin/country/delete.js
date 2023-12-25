import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import Country from '@/models/country';

const handler = async (req, res) => {
    if (req.method !== 'DELETE') {
        return reqMethodError(res, 'DELETE');
    }
    try {
        await connectDB();
        // await adminAuthGuard(req, res);
        // if(!req.user?._id){
        //     return;
        // }

        const { id } = req.query;
        const country = await Country.findByIdAndDelete(id);
        if(!country){
            return errorHandler(res, 404, "Country was not found.")
        }
        res.json({
            success: true,
            message: `${country.name} has been removed from country list.`
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
