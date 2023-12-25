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

    const { keyword } = req.query; 
    const searchResults = await Order.aggregate([
      {         // Service Request
        $lookup: {
          from: 'servicereqs',
          localField: 'serviceReq',
          foreignField: '_id',
          as: 'serviceRequest',
        },
      },
      {         // Job Post
        $lookup: {
          from: 'jobposts',
          localField: 'jobPost',
          foreignField: '_id',
          as: 'jobPostData',
        },
      },
      {         // Services
        $lookup: {
          from: 'services',
          localField: 'service',
          foreignField: '_id',
          as: 'serviceData',
        },
      },
      {         // Client Data
        $lookup: {
          from: 'users',
          localField: 'client',
          foreignField: '_id',
          as: 'clientData',
        },
      },
      {         // Freelancer Data
        $lookup: {
          from: 'users',
          localField: 'freelancer',
          foreignField: '_id',
          as: 'freelancerData',
        },
      },
      {         // Delivery 
        $lookup: {
          from: 'deliveries',
          localField: 'delivery',
          foreignField: '_id',
          as: 'deliveryData',
        },
      },
      {
        $match: {
          $and: [
            {
              $or: [
                { 'serviceRequest.title': { $regex: keyword, $options: 'i' } },
                { 'serviceRequest.desc': { $regex: keyword, $options: 'i' } },
                { 'jobPostData.title': { $regex: keyword, $options: 'i' } },
                { 'jobPostData.desc': { $regex: keyword, $options: 'i' } },
                { 'serviceData.title': { $regex: keyword, $options: 'i' } },
                { 'serviceData.desc': { $regex: keyword, $options: 'i' } },
            ],
        },
        { 'clientData._id': req.user._id },
          ],
        },
      },
      {
        $project: {
          serviceRequest: {title: 1, desc: 1, _id: 1}, 
          serviceData: {title: 1, desc: 1, _id: 1}, 
          jobPostData: {title: 1, desc: 1, _id: 1},
          clientData: {name:1, username: 1, _id: 1},
          freelancerData: {name:1, username: 1, _id: 1},
          deliveryData: 1,
          isCompleted: 1,
          isDelivered: 1,
          isRevised: 1,
        },
      },
    ]);


    if(!searchResults[0]){
      return res.status(404).json({ success: false, message: `Couldn't find any order of ${keyword}.` });
    }
    res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

