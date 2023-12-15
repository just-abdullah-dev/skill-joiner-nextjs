import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { mediaUploadMiddleware } from '@/middleware/mediaUploadMiddleware';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import User from '@/models/user';
import fileRemover from '../../../utils/fileRemover';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        return reqMethodError(res, 'PUT');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);

        // Multer middleware to handle file upload
        const upload = mediaUploadMiddleware.single('avatar');
        upload(req, res, async function (err) {
            if (err) {
                // Multer error
                return errorHandler(res, 500, err.message);
            } else if (err) {
                // Other errors          
                return errorHandler(res, 500, err.message);
            }


            const avatar = req.file ? `/${req.file.filename}` : null;
            // File upload successful, now process other user profile updates

            (async () => {
                const body = JSON.parse(req.body.document);
                const { name, username, profession, country, about,
                    bio, languages, password, skills, education } = body;
                let user = await User.findById(req.user._id);
                if (!user) {
                    return errorHandler(res, 404, "User not found.");
                }

                if (avatar) {
                    if(user.avatar){
                        fileRemover(user.avatar);
                    }
                    user.avatar = avatar;
                }
                user.name = req.body.name || name;
                user.username = req.body.username || username;
                user.profession = req.body.profession || profession;
                user.country = req.body.country || country;
                user.about = req.body.about || about;
                user.bio = req.body.bio || bio;
                user.languages = req.body.languages || languages;
                user.skills = req.body.skills || skills;
                user.education = req.body.education || education;
                if(password){
                    user.password = password;
                }

                await user.save();
                const updatedUser = await User.findById(user._id).select({password:0,otpCode:0})
                res.status(200).json({ success: true, data: updatedUser });
            })();
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
