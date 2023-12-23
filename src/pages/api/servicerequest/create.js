import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { mediaUploadMiddleware } from '@/middleware/mediaUploadMiddleware';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import ServiceReq from '@/models/request';
import User from '@/models/user';
import { sendMailRecieveRequest } from '@/utils/mail/sendMailRecieveRequest';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return reqMethodError(res, 'POST');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);

        // Multer middleware to handle file upload
        const attach = mediaUploadMiddleware.fields([
            { name: 'photos' }, { name: 'videos' }, { name: 'docs' },
        ])(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err.message);
            }

            const body = JSON.parse(req.body.body);
            const { title, desc, time, budget, requestTo } = body;

            const freelancer = await User.findById(requestTo);
            if (!freelancer) {
                return errorHandler(res, 400, "Freelancer was not found.")
            }
            await sendMailRecieveRequest(freelancer.email, title, req.user.name, freelancer.name);
            
            let request = await ServiceReq.create({
                title, desc, time, budget,
                requestBy: req.user._id, requestTo
            });
            
            let Request = await ServiceReq.findById(request._id);

            let photos = req.files['photos'];
            let videos = req.files['videos'];
            let docs = req.files['docs'];

            if(photos){
                photos = photos.map((item)=>{
                    return item.filename;
                })
                Request.photos = photos;
            }

            if(videos){
                videos = videos.map((item)=>{
                    return item.filename;
                })
                Request.videos = videos;

            }

            if(docs){
                docs = docs.map((item)=>{
                    return item.filename;
                })
                Request.docs = docs;
            }
            await Request.save();
            res.status(201).json({ success: true,
                message: 'Service Request created successfully',
                data: Request, 
             });
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
