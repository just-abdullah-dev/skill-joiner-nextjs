import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { mediaUploadMiddleware } from '@/middleware/mediaUploadMiddleware';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Project from '@/models/project';
import fileRemover from '@/utils/fileRemover';

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
        const attach = mediaUploadMiddleware.fields([
            { name: 'photos' }, { name: 'videos' }, { name: 'docs' },
        ])(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err.message);
            }

            const body = JSON.parse(req.body.body);
            const { id, title, desc, start, end } = body;

            let projectData = await Project.findById(id);
            if(!projectData){
                return errorHandler(res, 404, "Project was not found.")
            }

            projectData.title = title;
            projectData.desc = desc;
            projectData.start = start;
            projectData.end = end;

            projectData.photos.map((item)=>{
                fileRemover(item)
            });
            projectData.photos = [];
    
            projectData.videos.map((item)=>{
                fileRemover(item)
            });
            projectData.videos = [];

            projectData.docs.map((item)=>{
                fileRemover(item)
            });
            projectData.docs = [];

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

            res.status(201).json({ success: true,
                data: projectData,
                message: 'Project has been updated successfully' });
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
