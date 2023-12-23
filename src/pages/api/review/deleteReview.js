import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Education from '@/models/education';
import User from '@/models/user';


const handler = async (req, res) => {
    if (req.method !== 'DELETE') {
        return reqMethodError(res, 'DELETE');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);
        const { id } = req.query;

        const edu = await Education.findById(id);
        if(!edu){
            return errorHandler(res, 404, "Education was not found.")
        }
        await edu.deleteOne();
        let user = await User.findById(req.user._id);
        if(user.education){
            let array = [];
            user.education.map((item)=>{
                if(id != item){
                    array.push(item);
                }
            })
            user.education = array;
        }
        await user.save(); 
        res.json({
            success:true,
            message: "Education has been removed from user profile."
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
