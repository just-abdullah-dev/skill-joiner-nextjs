import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { mediaUploadMiddleware } from '@/middleware/mediaUploadMiddleware';
import { reqMethodError } from '@/utils/reqError';
import { userAuthGuard } from '@/middleware/userMiddlewares';
import Service from '@/models/service';
import Package from '@/models/package';
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
                return errorHandler(res,500,err.message);
            }

            const body = JSON.parse(req.body.body);
            
            let { title, desc, profession, slug, skills, packages, publish } = body;
            if(publish == 'yes'){
                publish = true;
            }else if(publish == 'no'){
                publish = false;
            }
            let service = await Service.create({
                title, desc, profession, skills, publish, slug,
                user: req.user._id
            });
            
            // Creating packages and adding them into 
            // the service packages array
            if(packages && packages.length > 0){
                packages.map((item)=>{
                    const main = async()=>{
                        await Package.create({
                            title: item.title,
                            desc: item.desc,
                            price: item.price,
                            time: item.time,
                            service: service._id
                        })
                    };
                    main();
                });
            }
            
            let serviceData = await Service.findById(service._id);
            
            const pkgArr = await Package.find({service: service._id});
            pkgArr.map((item)=>{
                serviceData.packages.push(item._id);
            })

            let photos = req.files['photos'];
            let videos = req.files['videos'];
            let docs = req.files['docs'];

            if(photos){
                photos = photos.map((item)=>{
                    return item.filename;
                })
                serviceData.photos = photos;
            }

            if(videos){
                videos = videos.map((item)=>{
                    return item.filename;
                })
                serviceData.videos = videos;

            }

            if(docs){
                docs = docs.map((item)=>{
                    return item.filename;
                })
                serviceData.docs = docs;
            }
            await serviceData.save();
            let user = await User.findById(req.user._id);
            user.services.push(serviceData._id);
            await user.save();

            res.status(201).json({ success: true,
                data: serviceData,
                message: 'Service has been created successfully' });
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
