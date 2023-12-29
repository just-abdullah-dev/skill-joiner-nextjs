import connectDB from '@/config/db';
import {userAuthGuard} from '@/middleware/userMiddlewares';
import JobPost from '@/models/jobPost'; 
import Order from '@/models/order';
import Service from '@/models/service';
import JobBid from '@/models/jobBid';
import ServiceReq from '@/models/request';
import sendMailOrderCancellation from '@/utils/mail/orderCancellation';
import errorHandler from '@/middleware/errorHandler';
import { sendMailOrderRevision } from '@/utils/mail/sendMailOrderRevision';

export default async function handler(req, res){
    try {
      if(req.method !== 'POST'){
        return reqMethodError(res, 'POST');
    }
    
    await connectDB();
    await userAuthGuard(req, res);
    
    // type means either post, request or service
    const { id, title } = req.body; 
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
        "http://localhost:3000/api/salam"
    );
    
    await order.save();
    res.status(200).json({ success: true, message: 'Request for revision has been made.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

