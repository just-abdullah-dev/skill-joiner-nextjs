import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import Profession from '@/models/profession';

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
        let profession = await Profession.findById(id);
        if(!profession){
            return errorHandler(res, 404, 'Profession was not found')
        }
        profession.name = name;
        profession.slug = slug;
        await profession.save();
        res.status(200).json({
            success: true, data: profession,
            message: 'Profession has been updated successfully'
        });


    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
