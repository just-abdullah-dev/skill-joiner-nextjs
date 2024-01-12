import connectDB from '@/config/db';
import Project from '@/models/project'; 
import Skill from '@/models/skills';
import Profession from '@/models/profession';
import Review from '@/models/reviews';

export default async function handler(req, res){
    try {
    await  connectDB();

    const { keyword, limit } = req.query;
    const searchResults = await Project.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: limit? parseInt(limit,10) : 4 },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $match: {
              $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { desc: { $regex: keyword, $options: 'i' } },
              ],
            },
      },
      {
        $project: {
          title: 1,
          desc:1,
          photos: 1,
          videos: 1,
          docs: 1,
          start: 1,
          end: 1,
          user: {name: 1, avatar: 1, username: 1, _id:1},
        },
      },
    ]);
    if(!searchResults[0]){
      return res.status(404).json({ success: false, message: `Couldn't find ${keyword} in projects.` });
    }
    res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

