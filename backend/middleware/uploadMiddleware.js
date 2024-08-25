const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        cb(null, true); // Allow all files, can add type checks if needed
    }
}).single('image'); // Ensure 'image' matches the field name in your FormData

module.exports = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'An error occurred during upload' });
        }

        // Check if file is uploaded and log the result
        if (!req.file) {
            console.log('No file uploaded.');
        } else {
            console.log('File uploaded successfully:', req.file);
        }

        next(); // Proceed to the next middleware or route handler
    });
};
