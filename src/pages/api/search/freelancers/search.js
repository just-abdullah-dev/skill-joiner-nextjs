import connectDB from '@/config/db';
import User from '@/models/user'; 
import Skill from '@/models/skills';
import Profession from '@/models/profession';
import Review from '@/models/reviews';

export default async function handler(req, res){
    try {
    await  connectDB();

    const { keyword } = req.query; 
    const searchResults = await User.aggregate([
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
          professionData: 1, 
          skillsData: 1,
          countryData: 1,
          reviewsData: 1,
          // Add other fields you want to include with 1, exclude with 0
          // Example: 
          // Exclude fields: fieldToExclude: 0, anotherFieldToExclude: 0,
        },
      },
      // Add more $lookup stages for other referenced collections if needed
    ]);

    res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

