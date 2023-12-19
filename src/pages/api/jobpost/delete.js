import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import JobPost from '@/models/jobPost';
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

        const Post = await JobPost.findById(id);
        
        Post.photos.map((item)=>{
            fileRemover(item)
        });

        Post.videos.map((item)=>{
            fileRemover(item)
        });

        Post.docs.map((item)=>{
            fileRemover(item)
        });
        await Post.deleteOne();
        res.json({
            success:true,
            message: "Job Post has been deleted successfully."
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
