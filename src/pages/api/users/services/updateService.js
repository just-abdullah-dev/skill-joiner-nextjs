import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { mediaUploadMiddleware } from '@/middleware/mediaUploadMiddleware';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Service from '@/models/service';
import Package from '@/models/package';
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
            const { id, title, desc, slug, profession, skills, publish } = body;
            let service = await Service.findById(id);
            if(!service){
                return errorHandler(res, 404, "Service was not found.")
            }
            
            if(publish == 'yes'){
                service.publish = true;
            }else if(publish == 'no'){
                service.publish = false;
            }
            service.title = title || service.desc;
            service.desc = desc || service.desc;
            service.slug = slug || service.slug;
            service.profession = profession || service.profession;
            service.skills = skills || service.skills;

            service.photos.map((item)=>{
                fileRemover(item)
            });
            service.photos = [];
    
            service.videos.map((item)=>{
                fileRemover(item)
            });
            service.videos = [];

            service.docs.map((item)=>{
                fileRemover(item)
            });
            service.docs = [];

            let photos = req.files['photos'];
            let videos = req.files['videos'];
            let docs = req.files['docs'];

            if(photos){
                photos = photos.map((item)=>{
                    return item.filename;
                })
                service.photos = photos;
            }

            if(videos){
                videos = videos.map((item)=>{
                    return item.filename;
                })
                service.videos = videos;
            }

            if(docs){
                docs = docs.map((item)=>{
                    return item.filename;
                })
                service.docs = docs;
            }

            await service.save();

            res.status(201).json({ success: true,
                data: service,
                message: 'Service has been updated successfully' });
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
