import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import Skill from '@/models/skill';

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        return reqMethodError(res, 'GET');
    }
    try {
        await connectDB();
        const skill = await Skill.find({})

        res.status(201).json({
            success: true,
            message: 'All skill\'s.',
            data: skill,
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
