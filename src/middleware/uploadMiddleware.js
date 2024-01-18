// middleware/uploadMiddleware.js
import multer from 'multer';

const storage = multer.diskStorage({
    destination: './public/uploads', // Set your desired upload directory
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

export default function uploadMiddleware(req, res, next) {
    upload.single('prescriptionFile')(req, res, (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).json({ error: 'File Upload Error' });
        }
        next();
    });
}
