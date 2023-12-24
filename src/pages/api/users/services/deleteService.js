import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Service from '@/models/service';
import Package from '@/models/package';
import fileRemover from '@/utils/fileRemover';
import User from '@/models/user';


const handler = async (req, res) => {
    if (req.method !== 'DELETE') {
        return reqMethodError(res, 'DELETE');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);
        const { id } = req.query;

        const service = await Service.findById(id);
        if(!service){
            return errorHandler(res, 404, "Service was not found.")
        }
        service.photos.map((item)=>{
            fileRemover(item)
        });

        service.videos.map((item)=>{
            fileRemover(item)
        });

        service.docs.map((item)=>{
            fileRemover(item)
        });

        service.packages.map((item)=>{
            (async()=>{
                await Package.findByIdAndDelete(item);
            })();
        });
        await service.deleteOne();

        let user = await User.findById(req.user._id);
        if(user.services){
            let array = [];
            user.services.map((item)=>{
                if(id != item){
                    array.push(item);
                }
            })
            user.services = array;
        }
        await user.save(); 
        res.json({
            success:true,
            message: "Service has been deleted successfully."
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
