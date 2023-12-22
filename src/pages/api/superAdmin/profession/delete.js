import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import Profession from '@/models/profession';

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
        const profession = await Profession.findByIdAndDelete(id);
        if(!profession){
            return errorHandler(res, 404, "Profession was not found.")
        }
        res.json({
            success: true,
            message: `${profession.name} has been removed from profession list.`
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
