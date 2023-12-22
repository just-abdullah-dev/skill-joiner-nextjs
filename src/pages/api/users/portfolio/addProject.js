import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { mediaUploadMiddleware } from '@/middleware/mediaUploadMiddleware';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Project from '@/models/project';
import User from '@/models/user';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return reqMethodError(res, 'POST');
    }
    try {
        await connectDB();
        await userAuthGuard(req, res);

        // Multer middleware to handle file upload
        const attach = mediaUploadMiddleware.fields([
            { name: 'photos' }, { name: 'videos' }, { name: 'docs' },
        ])(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err.message);
            }

            const body = JSON.parse(req.body.body);
            const { title, desc, start, end } = body;
            
            let project = await Project.create({
                title, desc, start, end,
                user: req.user._id
            });
            
            let projectData = await Project.findById(project._id);

            let photos = req.files['photos'];
            let videos = req.files['videos'];
            let docs = req.files['docs'];

            if(photos){
                photos = photos.map((item)=>{
                    return item.filename;
                })
                projectData.photos = photos;
            }

            if(videos){
                videos = videos.map((item)=>{
                    return item.filename;
                })
                projectData.videos = videos;

            }

            if(docs){
                docs = docs.map((item)=>{
                    return item.filename;
                })
                projectData.docs = docs;
            }
            await projectData.save();
            let user = await User.findById(req.user._id);
            user.portfolio.push(projectData._id);
            await user.save();

            res.status(201).json({ success: true,
                data: projectData,
                message: 'Project has been created successfully' });
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
