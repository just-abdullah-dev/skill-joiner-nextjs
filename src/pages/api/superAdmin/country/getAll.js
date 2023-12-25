import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import Country from '@/models/country';

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        return reqMethodError(res, 'GET');
    }
    try {
        await connectDB();

        const country = await Country.find({})

        res.status(201).json({
            success: true,
            message: 'All country\'s.',
            data: country,
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
