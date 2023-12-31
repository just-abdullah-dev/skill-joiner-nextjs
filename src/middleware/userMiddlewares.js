import User from '@/models/user';
import errorHandler from './errorHandler';
const { verify } = require('jsonwebtoken');

const userAuthGuard = async (req, res) => {
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const { id } = verify(token, process.env.JWT_SECRET);
            const data = await User.findById(id).select("-password");
            if(!data){
                return errorHandler(res, 400, "User not found. Maybe admin added this user to blacklist.");
            }
            req.user = data;
        } catch(error) {
            return errorHandler(res, 400, "Invalid Token");
        }
    }else{
        return errorHandler(res, 400, "Invalid Token");
    }
}

module.exports = {
    userAuthGuard,
}