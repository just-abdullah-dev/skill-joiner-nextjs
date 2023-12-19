import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import JobPost from '@/models/jobPost';

const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        return reqMethodError(res, 'PUT');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);
        const { id, isHired } = req.body;
        let Post = await JobPost.findById(id);
        if (isHired == 'yes') {
            Post.isHired = true;
        }else if (isHired == 'no') {
            Post.isHired = false;
        }
        await Post.save();
        res.status(200).json({ success: true, data: Post, message: 'Job Post Hired Property has been updated.' });
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
