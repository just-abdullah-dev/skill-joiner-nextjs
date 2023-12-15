import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join("./public/media/"))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const mediaUploadMiddleware = multer({
    storage:storage,
    limits:{
        fileSize: 400 * 1024 * 1024
    },
    fileFilter: function (req, file, cb){
        let ext = path.extname(file.originalname);
        if(ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && 
        ext !== ".pdf" && ext !== ".mp4" && ext !== ".PNG" && ext !== ".JPG" && 
        ext !== ".JPEG" && ext !== ".PDF" && ext !== ".MP4"){
            return cb(new Error("File Type Error. Kindly upload only mentioned file type."));
        }
        cb(null,true);
    }
});

