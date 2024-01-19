import connectDB from '@/config/db';
import {userAuthGuard} from '@/middleware/userMiddlewares';
import JobPost from '@/models/jobPost'; 
import Order from '@/models/order';
import Service from '@/models/service';
import JobBid from '@/models/jobBid';
import ServiceReq from '@/models/request';
import errorHandler from '@/middleware/errorHandler';
import { sendMailOrderRevision } from '@/utils/mail/sendMailOrderRevision';

export default async function handler(req, res){
    try {
      if(req.method !== 'PUT'){
        return reqMethodError(res, 'PUT');
    }
    
    await connectDB();
    await userAuthGuard(req, res);
    
    // type means either post, request or service
    const { id, title, desc } = JSON.parse(req.body); 
    let order = await Order.findById(id).populate('freelancer','email name');
    if(!order){
      return errorHandler(res, 404, 'Order was not found.')
    }
    order.isRevised = true;

    await sendMailOrderRevision(
        order.freelancer.email,
        req.user.name,
        order.freelancer.name,
        title,
        "https://skilljoiner.com/dashboard/orders",desc
    );
    
    await order.save();
    res.status(200).json({ success: true, message: 'Request for revision has been made.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

