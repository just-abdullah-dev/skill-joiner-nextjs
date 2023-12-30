import connectDB from '@/config/db';
import {userAuthGuard} from '@/middleware/userMiddlewares';
import User from '@/models/user'; 
import Order from '@/models/order';
import Profession from '@/models/profession';
import Review from '@/models/reviews';
import Service from '@/models/service';

export default async function handler(req, res){
    try {
    await connectDB();
    await userAuthGuard(req, res);
    const reviews = await Review.find({
      reviewTo: req.user._id
    }).populate('order').populate('reviewBy', 'avatar name username');
    
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

