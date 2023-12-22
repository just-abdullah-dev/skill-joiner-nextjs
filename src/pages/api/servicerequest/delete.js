import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import ServiceReq from '@/models/request';
import fileRemover from '@/utils/fileRemover';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method !== 'DELETE') {
        return reqMethodError(res, 'DELETE');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);
        const { id } = req.query;

        const request = await ServiceReq.findById(id);
        if(!request){
            return errorHandler(res, 404, "Request was not found.")
        }
        
        request.photos.map((item)=>{
            fileRemover(item)
        });

        request.videos.map((item)=>{
            fileRemover(item)
        });

        request.docs.map((item)=>{
            fileRemover(item)
        });
        await request.deleteOne();
        res.json({
            success:true,
            message: "Service Request has been deleted successfully."
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
