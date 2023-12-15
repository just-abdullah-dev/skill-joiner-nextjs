import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import RegNum from '@/models/stdRegNum';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from "@/middleware/adminMiddlewares";

export default async function handler (req, res){
    try {
        if(req.method !== 'POST'){
            return reqMethodError(res, 'POST');
        }

        const { name, number } = req.body;
        if(!number){
            return errorHandler(res, 400, "Registration number field can't be left empty.");
        }
        
        await connectDB();
        await adminAuthGuard(req, res);

        let regNum = await RegNum.findOne({number});
        if(regNum){
            return errorHandler(res, 400, "Registration number already exist.")
        }
        
        regNum = await RegNum.create({
            name,
            number,
        });
        
        return res.status(201).json({
            status: true,
            data: regNum
        })
        
    } catch (error) {
        errorHandler(res, 500, {
            name: error.name,
            message: error.message,
        });
    }
}
