import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import ServiceReq from '@/models/request';

const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        return reqMethodError(res, 'PUT');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);
        const { id, isAccepted, isRejected } = req.body;
        let request = await ServiceReq.findById(id);
        if(!request){
            return errorHandler(res, 404, "Request was not found.")
        }
        request.isAccepted = false;
        request.isRejected = false;
        
        if (isAccepted == 'yes') {
            request.isAccepted = true;
        }else if (isRejected == 'yes') {
            request.isRejected = true;
        }

        await request.save();
        res.status(200).json({ success: true, data: request, message: 'Job Post Hired Property has been updated.' });
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
