import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import Country from '@/models/country';

const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        return reqMethodError(res, 'PUT');
    }
    try {
        await connectDB();
        // await adminAuthGuard(req, res);
        // if(!req.user?._id){
        //     return;
        // }
        const { name, slug, id, possibleNames } = req.body;
        let country = await Country.findById(id);
        if(!country){
            return errorHandler(res, 404, 'Country was not found')
        }
        country.name = name || country.name;
        country.slug = slug || country.slug;
        country.possibleNames = possibleNames || country.possibleNames;
        await country.save();
        res.status(200).json({
            success: true, data: country,
            message: 'Country has been updated successfully'
        });


    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
