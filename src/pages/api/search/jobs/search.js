import connectDB from '@/config/db';
import JobPost from '@/models/jobPost'; 
import Skill from '@/models/skills';
import Profession from '@/models/profession';
import Review from '@/models/reviews';

export default async function handler(req, res){
    try {
    await  connectDB();

    const { keyword } = req.query;
    const searchResults = await JobPost.aggregate([
      {
        $lookup: {
          from: 'professions',
          localField: 'category',
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
            { isHired: false }, 
          ],
        },
      },
      {
        $project: {
          title: 1,
          desc: 1,
          time: 1,
          budget: 1,
          isHired: 1,
          professionData: {name: 1, slug: 1}, 
          skillsData: {name: 1, slug: 1},
          userData: {
            _id: 1,
            name: 1,
            username: 1,
            avatar: 1,
          },
        },
      },
    ]);
    if(!searchResults[0]){
      return res.status(404).json({ success: false, message: `Couldn't find ${keyword} in jobs.` });
    }
    res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

