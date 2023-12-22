import SuperAdmin from '@/models/superAdmin';
import errorHandler from './errorHandler';
const { verify } = require('jsonwebtoken');

const adminAuthGuard = async (req, res) => {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const { id } = verify(token, process.env.JWT_SECRET);
            const data = await SuperAdmin.findById(id).select("-password");
            if(!data){
                return errorHandler(res, 400, "Admin not found.");
            }else{
                req.user = data;
            }
        } catch(error) {
            return errorHandler(res, 400, "Invalid Token");
        }
    }else{
        return errorHandler(res, 400, "Invalid Token");
    }
}
    
module.exports = {
    adminAuthGuard,
}