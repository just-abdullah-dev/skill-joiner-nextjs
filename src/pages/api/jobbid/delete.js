import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import JobBid from '@/models/jobBid';
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

        const Bid = await JobBid.findById(id);
        if(!Bid){
            return errorHandler(res, 404, "Bid was not found.")
        }
        Bid.photos.map((item)=>{
            fileRemover(item)
        });

        Bid.videos.map((item)=>{
            fileRemover(item)
        });

        Bid.docs.map((item)=>{
            fileRemover(item)
        });
        await Bid.deleteOne();
        res.json({
            success:true,
            message: "Job Bid has been deleted successfully."
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
