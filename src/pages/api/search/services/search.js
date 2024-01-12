import connectDB from '@/config/db';
import Service from '@/models/service'; 
import Skill from '@/models/skills';
import Profession from '@/models/profession';
import Review from '@/models/reviews';

export default async function handler(req, res){
    try {
    await  connectDB();

    const { keyword,limit } = req.query;
    const searchResults = await Service.aggregate([
      { $limit: limit? parseInt(limit,10) : 4 },
      {
        $lookup: {
          from: 'professions',
          localField: 'profession',
          foreignField: '_id',
          as: 'profession',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'skills',
          localField: 'skills',
          foreignField: '_id',
          as: 'skills',
        },
      },
      {
        $lookup: {
          from: 'packages',
          localField: 'packages',
          foreignField: '_id',
          as: 'packages',
        },
      },
      {
        $lookup: {
          from: 'reviews',
          localField: 'reviews',
          foreignField: '_id',
          as: 'reviews',
        },
      },
      {
        $match: {
          $and: [
            {
              $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { desc: { $regex: keyword, $options: 'i' } },
                { 'profession.possibleNames': { $regex: keyword, $options: 'i' } },
                { 'skills.possibleNames': { $regex: keyword, $options: 'i' } },
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
          profession: {name: 1, slug: 1}, 
          skills: {name: 1, slug: 1},
          packages: 1,
          reviews: 1,
          user: {name: 1, avatar: 1, username: 1, _id:1},
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

