import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import Skill from '@/models/skill';

const handler = async (req, res) => {
    if (req.method !== 'DELETE') {
        return reqMethodError(res, 'DELETE');
    }
    try {
        await connectDB();
        await adminAuthGuard(req, res);
        if(!req.user?._id){
            return;
        }
        const { id } = req.query;
        const skill = await Skill.findByIdAndDelete(id);
        if(!skill){
            return errorHandler(res, 404, "Skill was not found.")
        }
        res.json({
            success: true,
            message: `${skill.name} has been removed from skill list.`
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
