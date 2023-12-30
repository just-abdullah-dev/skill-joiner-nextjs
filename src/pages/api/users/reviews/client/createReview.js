import connectDB from '@/config/db';
import {userAuthGuard} from '@/middleware/userMiddlewares';
import User from '@/models/user'; 
import Order from '@/models/order';
import Review from '@/models/reviews';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';

export default async function handler(req, res){
    try {
      if(req.method !== 'POST'){
        return reqMethodError(res, 'POST');
    }
    await connectDB();
    await userAuthGuard(req, res);

    const { desc, rating, orderId, parent } = req.body; 
    const order = await Order.findById(orderId).populate('freelancer','email name _id');
    if(!order){
      return errorHandler(res, 404, 'Order was not found.')
    }
    const review = await Review.create({
      desc, reviewBy: req.user._id,
      reviewTo: order.freelancer._id,
      rating, order: orderId, parent: parent?parent:null
    })
    if(!parent){
      let freelancer = await User.findById(order.freelancer._id);
      freelancer.reviews.push(review._id);
      await freelancer.save();
    }
    
    res.status(200).json({ success: true, 
      message: 'Review has been created.',
      data:review });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

