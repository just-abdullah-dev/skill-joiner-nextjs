import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Package from '@/models/package';
import Service from '@/models/service';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return reqMethodError(res, 'POST');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);

        const { title, price, time, desc, serviceId } = JSON.parse(req.body);
        let service = await Service.findById(serviceId);
        if(!service){
            return errorHandler(res, 404, "Service was not found.")
        }
        
        const pkg = await Package.create({
            title, price, time, desc, service:serviceId,
        });

        service.packages.push(pkg._id);
        await service.save();

        res.status(201).json({
            success: true,
            message: 'Package has been added to user service.',
            data: pkg
        });


    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
