import connectDB from '@/config/db';
import {userAuthGuard} from '@/middleware/userMiddlewares';
import Review from '@/models/reviews';
import User from '@/models/user';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';

export default async function handler(req, res){
    try {
      if(req.method !== 'DELETE'){
        return reqMethodError(res, 'DELETE');
    }
    await connectDB();
    await userAuthGuard(req, res);

    const { id } = req.query; 
    const review = await Review.findByIdAndDelete(id);
    if(!review){
      return errorHandler(res, 404, 'Review was not found.')
    }
    let user = await User.findById(review.reviewTo);
    if (!user) {
      return errorHandler(res, 404, "User was not found.")
    }
    let array = [];
    user.reviews.map((item)=>{
      if(item != id){
        array.push(item);
      }
    })
    user.reviews = array;
    await user.save();
    const reply = await Review.find({parent:id});
    await Review.findOneAndDelete({_id:reply[0]?._id});

    res.status(200).json({ success: true, message: 'Review has been deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

