import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Skill from '@/models/skills';
import User from '@/models/user';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return reqMethodError(res, 'POST');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);
        const { id } = req.query;

        const skill = await Skill.findById(id);
        if(!skill){
            return errorHandler(res, 404, 'Skill was not found.')
        }

        let user = await User.findById(req.user._id);
        user.skills.push(skill._id);
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Skill has been added to user profile.'
        });


    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
