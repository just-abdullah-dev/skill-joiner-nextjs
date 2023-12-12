import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import User from '@/models/user';
import Blacklist from '@/models/blacklist';
import { reqMethodError } from '@/utils/reqError';

export default async function handler (req, res){
    try {
        if(req.method !== 'POST'){
            return reqMethodError(res, 'POST');
        }

        const { name, email, student } = req.body;
        if(!email || !student){
            return errorHandler(res, 400, "Please fill all feilds.");
        }
        await connectDB();
        let user = await Blacklist.findOne({email});
        if(user){
            return errorHandler(res, 400, "User is already in blacklist.")
        }
        let std;
        if(student=="no"){
            std=false;
        }else if(student=='yes'){
            std=true;
        }
        
        user = await Blacklist.create({
            name,
            email,
            student:std,
        });

        await User.deleteOne({email});
        
        return res.status(201).json({
            status: true,
            data: user
        })
        
    } catch (error) {
        errorHandler(res, 500, {
            name: error.name,
            message: error.message,
        });
    }
}
