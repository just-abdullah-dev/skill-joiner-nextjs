import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import ServiceReq from '@/models/request';
import Order from '@/models/order';
import User from '@/models/user';
import { sendMailRequestAccepted } from '@/utils/mail/sendMailRequestAccepted';
import { sendMailRequestRejected } from '@/utils/mail/sendMailRequestRejected';

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
        
        const client = await User.findById(request.requestBy);
        if(!client){
            return errorHandler(res, 404, "Client was not found.")
        }

        if (isAccepted == 'yes') {
            request.isAccepted = true;
            const order = await Order.create({
                client: request.requestBy,
                freelancer: req.user._id,
                serviceReq: id,
            });
            await sendMailRequestAccepted(client.email, request.title, client.name, req.user.name);
        }else if (isRejected == 'yes') {
            request.isRejected = true;
            await sendMailRequestRejected(client.email, request.title, client.name, req.user.name);
        }

        await request.save();
        res.status(200).json({ success: true, data: request, message: 'Job Post Hired Property has been updated.' });
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
