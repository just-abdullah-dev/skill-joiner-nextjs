import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import Newsletter from '@/models/newsletter';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return reqMethodError(res, 'POST');
    }
    try {
        await connectDB();

        const { email } = JSON.parse(req.body);
        const newsletter = await Newsletter.create({
            email
        });

        res.status(201).json({
            success: true,
            message: 'Thank you for subscribing!',
            data: newsletter
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
