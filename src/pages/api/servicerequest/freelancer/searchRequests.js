import connectDB from '@/config/db';
import {userAuthGuard} from '@/middleware/userMiddlewares';
import User from '@/models/user'; 
import ServiceReq from '@/models/request';
import Profession from '@/models/profession';
import Review from '@/models/reviews';
import Service from '@/models/service';

export default async function handler(req, res){
    try {
    await connectDB();
    await userAuthGuard(req, res);

    const { keyword } = req.query; 
    const searchResults = await ServiceReq
    .aggregate([
      {         // Freelancer Data
        $lookup: {
          from: 'users',
          localField: 'requestBy',
          foreignField: '_id',
          as: 'requestBy',
        },
      },
      {
        $match: {
          $and: [
            {
              $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { desc: { $regex: keyword, $options: 'i' } },
            ],
        },
        { requestTo: req.user._id },
          ],
        },
      },
      {
        $project: {
          title: 1,
          desc: 1,
          photos: 1,
          videos: 1,
          docs: 1,
          time: 1,
          budget: 1,
          isAccepted: 1,
          isRejected: 1,
          requestBy: {name:1, username: 1, _id: 1, avatar: 1},
        },
      },
    ]);


    if(!searchResults[0]){
      return res.status(404).json({ success: false, message: `Couldn't find any request of ${keyword}.` });
    }
    res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

