import multer from 'multer';
import fs from 'fs';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        //'uploads' directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);  //set upload folder
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);  //use timestamp for unique filenames //TODO
    }
});

//image files only + gifs
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);  // Accept the file
    } else {
        cb(new Error('Only image files are allowed'));  // Reject the file
    }
};

//initialize multer upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }  //5mb
});


export default upload;
