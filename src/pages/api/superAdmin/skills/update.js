import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import Skill from '@/models/skills';

const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        return reqMethodError(res, 'PUT');
    }
    try {
        await connectDB();
        await adminAuthGuard(req, res);
        if(!req.user?._id){
            return;
        }

        const { name, slug, id } = req.body;
        let skill = await Skill.findById(id);
        if(!skill){
            return errorHandler(res, 404, 'Skill was not found')
        }
        skill.name = name;
        skill.slug = slug;
        await skill.save();
        res.status(200).json({
            success: true, data: skill,
            message: `${skill.name} has been updated successfully`
        });


    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
