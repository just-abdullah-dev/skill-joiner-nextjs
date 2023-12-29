import connectDB from '@/config/db';
import {userAuthGuard} from '@/middleware/userMiddlewares';
import JobPost from '@/models/jobPost'; 
import Order from '@/models/order';
import Service from '@/models/service';
import JobBid from '@/models/jobBid';
import ServiceReq from '@/models/request';
import sendMailOrderCancellation from '@/utils/mail/orderCancellation';
import errorHandler from '@/middleware/errorHandler';

export default async function handler(req, res){
    try {
      if(req.method !== 'POST'){
        return reqMethodError(res, 'POST');
    }
    await connectDB();
    await userAuthGuard(req, res);

    // type means either post, request or service
    const { id, reason, type, typeId } = req.body; 
    const order = await Order.findById(id).populate('freelancer','email name');
    if(!order){
      return errorHandler(res, 404, 'Order was not found.')
    }
    order.isCancelled = true;
    order.canceller = req.user._id;

    if(type == 'post'){
        let post = await JobPost.findById(typeId);
        post.isHired = false;
        post.freelancer = null;
        await post.save();
        await sendMailOrderCancellation(
          order.freelancer.email, reason, 
          post.title, order.freelancer.name,
          req.user.name
          )
    }else if(type == 'request'){
        const request = await ServiceReq.findById(typeId);
        await sendMailOrderCancellation(
          order.freelancer.email, reason, 
          request.title, order.freelancer.name,
          req.user.name
          )
    }else if(type == 'service'){
        const service = await Service.findById(typeId);
        await sendMailOrderCancellation(
          order.freelancer.email, reason, 
          service.title, order.freelancer.name,
          req.user.name
          )
    }
    
    await order.save();
    res.status(200).json({ success: true, message: 'Order has been cancelled.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

