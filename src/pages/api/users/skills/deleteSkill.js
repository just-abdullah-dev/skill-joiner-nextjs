import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import User from '@/models/user';

const handler = async (req, res) => {
    if (req.method !== 'DELETE') {
        return reqMethodError(res, 'DELETE');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);
        const { id } = req.query;

        let user = await User.findById(req.user._id);
        if(user.skills){
            let array = [];
            user.skills.map((item)=>{
                if(id != item){
                    array.push(item);
                }
            })
            user.skills = array;
        }
        await user.save(); 
        res.json({
            success:true,
            message: "Skill has been removed from user profile."
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
