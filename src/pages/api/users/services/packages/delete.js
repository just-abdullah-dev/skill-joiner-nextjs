import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Package from '@/models/package';
import Service from '@/models/service';


const handler = async (req, res) => {
    if (req.method !== 'DELETE') {
        return reqMethodError(res, 'DELETE');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);
        const { id } = req.query;
        const pkg = await Package.findById(id);
        if(!pkg){
            return errorHandler(res, 404, "Package was not found.")
        }
        
        let service = await Service.findById(pkg.service);
        if(!service){
            return errorHandler(res, 404, "Service was not found.")
        }
        if(service.packages){
            let array = [];
            service.packages.map((item)=>{
                if(id != item){
                    array.push(item);
                }
            })
            service.packages = array;
        }
        await service.save(); 
        await pkg.deleteOne();
        res.json({
            success:true,
            message: "Package has been removed from user service."
        })
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
