import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Project from '@/models/project';
import fileRemover from '@/utils/fileRemover';
import User from '@/models/user';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method !== 'DELETE') {
        return reqMethodError(res, 'DELETE');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);
        const { id } = req.query;

        const projectData = await Project.findById(id);
        if(!projectData){
            return errorHandler(res, 404, "Project was not found.")
        }
        projectData.photos.map((item)=>{
            fileRemover(item)
        });

        projectData.videos.map((item)=>{
            fileRemover(item)
        });

        projectData.docs.map((item)=>{
            fileRemover(item)
        });
        await projectData.deleteOne();
        let user = await User.findById(req.user._id);
        if(user.portfolio){
            let array = [];
            user.portfolio.map((item)=>{
                if(id != item){
                    array.push(item);
                }
            })
            user.portfolio = array;
        }
        await user.save(); 
        res.json({
            success:true,
            message: "Project has been deleted successfully."
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
