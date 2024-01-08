import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Education from '@/models/education';
import User from '@/models/user';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return reqMethodError(res, 'POST');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);

        let { degree, field, institute, desc, startDate, endDate, isCompleted } = JSON.parse(req.body);

        if (isCompleted == 'no') {
            endDate = '';
            isCompleted = false;
        }

        const edu = await Education.create({
            degree, desc, startDate, endDate, field, institute, isCompleted,
            user: req.user._id
        });

        let user = await User.findById(req.user._id);
        user.education.push(edu._id);
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Education has been added to user profile.',
            data: edu
        });


    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
