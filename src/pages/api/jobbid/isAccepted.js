import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import JobBid from '@/models/jobBid';
import JobPost from '@/models/jobPost';
import User from '@/models/user';
import { sendMailBidAccepted } from '@/utils/mail/sendMailBidAccepted';
import Order from '@/models/order';

const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        return reqMethodError(res, 'PUT');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);
        const { id, isAccepted, freelancer } = req.body;

        let Bid = await JobBid.findById(id);
        if (!Bid) {
            return errorHandler(res, 400, "Bid was not found.")
        }

        if (isAccepted == 'yes') {
            const Freelancer = await User.findById(freelancer);
            if (!Freelancer) {
                return errorHandler(res, 400, "Freelancer was not found.")
            }
            const post = await JobPost.findById(Bid.jobPost);
            if (!post) {
                return errorHandler(res, 400, "Job Post was not found.")
            }

            post.freelancer = Freelancer._id;
            post.isHired = true;
            await post.save();

            // sending mail to freelancer (email, title, client, std)
            await sendMailBidAccepted(Freelancer.email, post.title, req.user.name, Freelancer.name)
            Bid.isAccepted = true;

            const order = await Order.create({
                client: req.user._id,
                freelancer,
                jobPost: post._id,
            });
            
        } else if (isAccepted == 'no') {
            Bid.isAccepted = false;
        }
        await Bid.save();
        res.status(200).json({ success: true, data: Bid, message: 'Job Post Hired Property has been updated.' });
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
