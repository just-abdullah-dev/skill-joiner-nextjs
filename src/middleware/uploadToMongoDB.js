import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import path from 'path';

const acceptedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf', // PDF files
    'application/msword', // Word documents
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word documents
    'application/vnd.ms-excel', // Excel files
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel files
    'application/vnd.ms-powerpoint', // PowerPoint files
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PowerPoint files
    'application/zip', // ZIP files
    'application/x-rar-compressed', // RAR files
    'image/svg+xml', // SVG files
    'audio/mpeg', // MP3 files
    'audio/wav', // WAV files
    'audio/x-wav',
    'audio/mp4', // MP4 audio files
    'video/mp4', // MP4 video files
    'video/mpeg', // MPEG video files
    'video/quicktime', // QuickTime video files
    'video/x-msvideo', // AVI files
    'video/x-ms-wmv' // WMV files
];


// Create a function to filter files based on their type
const fileFilter = (req, file, cb) => {
    if (acceptedFileTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only JPEG, PNG, and GIF images are allowed.'), false); // Reject the file
    }
  };

const storage = new GridFsStorage({
  url: process.env.DB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const uploadToMongoDB = multer({ 
    storage: storage, 
    limits:{
        fileSize: 400 * 1024 * 1024
    },
    fileFilter: fileFilter,
});
export default uploadToMongoDB;