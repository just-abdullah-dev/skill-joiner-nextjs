import connectDB from '@/config/db';
import Service from '@/models/service'; 
import Skill from '@/models/skills';
import Profession from '@/models/profession';
import Review from '@/models/reviews';

export default async function handler(req, res){
    try {
    await  connectDB();

    const { keyword } = req.query;
    const searchResults = await Service.aggregate([
      {
        $lookup: {
          from: 'professions',
          localField: 'profession',
          foreignField: '_id',
          as: 'professionData',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userData',
        },
      },
      {
        $lookup: {
          from: 'skills',
          localField: 'skills',
          foreignField: '_id',
          as: 'skillsData',
        },
      },
      {
        $lookup: {
          from: 'packages',
          localField: 'packages',
          foreignField: '_id',
          as: 'packagesData',
        },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: 'reviews',
          foreignField: '_id',
          as: 'reviewsData',
        },
      },
      {
        $match: {
          $and: [
            {
              $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { desc: { $regex: keyword, $options: 'i' } },
                { 'professionData.possibleNames': { $regex: keyword, $options: 'i' } },
                { 'skillsData.possibleNames': { $regex: keyword, $options: 'i' } },
              ],
            },
            { publish: false }, 
          ],
        },
      },
      {
        $project: {
          title: 1,
          photos: 1,
          videos: 1,
          professionData: {name: 1, slug: 1}, 
          skillsData: {name: 1, slug: 1},
          packagesData: 1,
          reviewsData: 1,
          userData: {name: 1, avatar: 1, username: 1, _id:1},
        },
      },
    ]);
    if(!searchResults[0]){
      return res.status(404).json({ success: false, message: `Couldn't find ${keyword} in services.` });
    }
    res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

