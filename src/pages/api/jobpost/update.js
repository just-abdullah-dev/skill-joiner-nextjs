import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { mediaUploadMiddleware } from '@/middleware/mediaUploadMiddleware';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import JobPost from '@/models/jobPost';
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
        const {id} = req.query;

        // Multer middleware to handle file upload
        const attach = mediaUploadMiddleware.fields([
            { name: 'photos' }, { name: 'videos' }, { name: 'docs' },
        ])(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err.message);
            }

            const body = JSON.parse(req.body.body);
            const { title, desc, time, budget, category, skills } = body;
            
            let Post = await JobPost.findById(id);
            
            Post.title = title || Post.title;
            Post.desc = desc || Post.desc;
            Post.time = time || Post.time;
            Post.budget = budget || Post.budget;
            Post.category = category || Post.category;
            Post.skills = skills || Post.skills;

            Post.photos.map((item)=>{
                fileRemover(item)
            });
            Post.photos = [];
    
            Post.videos.map((item)=>{
                fileRemover(item)
            });
            Post.videos = [];

            Post.docs.map((item)=>{
                fileRemover(item)
            });
            Post.docs = [];

            let photos = req.files['photos'];
            let videos = req.files['videos'];
            let docs = req.files['docs'];

            if(photos){
                photos = photos.map((item)=>{
                    return item.filename;
                })
                Post.photos = photos;
            }

            if(videos){
                videos = videos.map((item)=>{
                    return item.filename;
                })
                Post.videos = videos;

            }

            if(docs){
                docs = docs.map((item)=>{
                    return item.filename;
                })
                Post.docs = docs;
            }
            await Post.save();
            res.status(200).json({ success: true, data: Post, message: 'Job Post updated successfully' });
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
