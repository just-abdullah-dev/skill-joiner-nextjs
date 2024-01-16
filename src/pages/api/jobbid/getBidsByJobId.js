import connectDB from '@/config/db';
import JobPost from '@/models/jobPost'; 
import Skill from '@/models/skills';
import Profession from '@/models/profession';
import Review from '@/models/reviews';
import JobBid from '@/models/jobBid';
import User from '@/models/user';

export default async function handler(req, res){
    try {
    await  connectDB();

    const { id } = req.query;
    const bids = await JobBid.find({jobPost:id}).populate([
      {
        path: 'user',
        select: 'avatar name username bio about',
      }
    ])
    
    res.status(200).json({ success: true, data: bids });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

