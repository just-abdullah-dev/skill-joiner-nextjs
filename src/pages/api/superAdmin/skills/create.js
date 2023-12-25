import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import Skill from '@/models/skills';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return reqMethodError(res, 'POST');
    }
    try {
        await connectDB();
        // await adminAuthGuard(req, res);
        // if(!req.user?._id){
        //     return;
        // }
        
        const { name, slug, possibleNames } = req.body;
        const skill = await Skill.create({
            name, slug, possibleNames,
        });

        res.status(201).json({
            success: true,
            message: `${skill.name} has been added to skill collection successfully`,
            data: skill
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
