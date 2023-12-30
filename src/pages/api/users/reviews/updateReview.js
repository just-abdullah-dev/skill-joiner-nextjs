import connectDB from '@/config/db';
import {userAuthGuard} from '@/middleware/userMiddlewares';
import Review from '@/models/reviews';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';

export default async function handler(req, res){
    try {
      if(req.method !== 'PUT'){
        return reqMethodError(res, 'PUT');
    }
    await connectDB();
    await userAuthGuard(req, res);

    const { desc, rating, id } = req.body; 
    let review = await Review.findById(id);
    if(!review){
      return errorHandler(res, 404, 'Review was not found.')
    }
    review.desc = desc || review.desc;
    review.rating = rating || review.rating;
    await review.save();
    res.status(200).json({ success: true, message: 'Review has been updated.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

