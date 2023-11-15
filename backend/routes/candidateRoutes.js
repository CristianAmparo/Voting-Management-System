const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // Add this line to require the path module
const { getCandidates, addCandidate, updateCandidate, deleteCandidate } = require('../controller/candidateController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

router.get('/', getCandidates);
router.post('/', upload.single('image'), addCandidate);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);

module.exports = router;
