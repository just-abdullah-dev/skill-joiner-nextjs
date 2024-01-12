import connectDB from '@/config/db';
import User from '@/models/user'; 
import Skill from '@/models/skills';
import Profession from '@/models/profession';
import Review from '@/models/reviews';

export default async function handler(req, res){
    try {
    await  connectDB();

    const { keyword,limit } = req.query; 
    const searchResults = await User.aggregate([
      { $limit: limit? parseInt(limit,10) : 4 },
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
          from: 'skills',
          localField: 'skills',
          foreignField: '_id',
          as: 'skillsData',
        },
      },
      {
        $lookup: {
          from: 'countries',
          localField: 'country',
          foreignField: '_id',
          as: 'countryData',
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
                { name: { $regex: keyword, $options: 'i' } },
                { username: { $regex: keyword, $options: 'i' } },
                { bio: { $regex: keyword, $options: 'i' } },
                { about: { $regex: keyword, $options: 'i' } },
                { 'professionData.possibleNames': { $regex: keyword, $options: 'i' } },
                { 'skillsData.possibleNames': { $regex: keyword, $options: 'i' } },
              ],
            },
            { student: true }, 
          ],
        },
      },
      {
        $project: {
          name: 1,
          avatar: 1,
          username: 1, 
          bio: 1, 
          about: 1, 
          professionData: {name: 1, slug: 1}, 
          skillsData: {name: 1, slug: 1},
          countryData: {name: 1, slug: 1},
          reviewsData: 1,
        },
      },
    ]);
    if(!searchResults[0]){
      return res.status(404).json({ success: false, message: `Couldn't find ${keyword} in user profiles.` });
    }
    res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

