import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Education from '@/models/education';

const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        return reqMethodError(res, 'PUT');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);

        let { id, degree, field, institute, desc, startDate, endDate, isCompleted } = req.body;

        let edu = await Education.findById(id);

        edu.degree = degree || edu.degree;
        edu.field = field || edu.field;
        edu.institute = institute || edu.institute;
        edu.desc = desc || edu.desc;
        edu.startDate = startDate || edu.startDate;
        
        if (isCompleted == 'no') {
            edu.endDate = '';
            edu.isCompleted = false;
        }else if(isCompleted == 'yes'){
            edu.endDate = endDate;
            edu.isCompleted = true;
        }
        await edu.save();

        res.status(201).json({
            success: true,
            message: 'Education has been updated to user profile.',
            data: edu
        });


    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
