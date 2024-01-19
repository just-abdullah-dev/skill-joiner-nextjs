import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { mediaUploadMiddleware } from '@/middleware/mediaUploadMiddleware';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import JobPost from '@/models/jobPost';
import Order from '@/models/order';
import Delivery from '@/models/delivery';
import { sendMailOrderDelivered } from '@/utils/mail/sendMailOrderDelivered';
import fileRemover from '@/utils/fileRemover';


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
                return errorHandler(res,500,err.message);
            }

            const body = JSON.parse(req.body.body);
            const { id, desc, title } = body;
            
            let order = await Order.findById(id).populate('client','email name');
            if(!order){
                return errorHandler(res, 404, "Order was not found.")
            }
            if(order?.delivery){
                const prevDelivery = await Delivery.findByIdAndDelete(order.delivery);
                prevDelivery.photos.map((item)=>{
                    fileRemover(item)
                });
                prevDelivery.videos.map((item)=>{
                    fileRemover(item)
                });
                prevDelivery.docs.map((item)=>{
                    fileRemover(item)
                });
            }
            
            let delivery = await Delivery.create({
                order:id, desc,
            });
            
            let deliveryData = await Delivery.findById(delivery._id);

            let photos = req.files['photos'];
            let videos = req.files['videos'];
            let docs = req.files['docs'];

            if(photos){
                photos = photos.map((item)=>{
                    return item.filename;
                })
                deliveryData.photos = photos;
            }

            if(videos){
                videos = videos.map((item)=>{
                    return item.filename;
                })
                deliveryData.videos = videos;

            }

            if(docs){
                docs = docs.map((item)=>{
                    return item.filename;
                })
                deliveryData.docs = docs;
            }
            await deliveryData.save();
            order.delivery = deliveryData._id;
            order.isDelivered = true;
            await order.save();
            await sendMailOrderDelivered(
                order.client.email, 
                order.client.name, 
                req.user.name, 
                title, "http://skilljoiner.com/dashboard/orders");
            res.status(201).json({ success: true,
                data: deliveryData, 
                message: 'Project has been delivered.' });
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
