import express from 'express';
import multer from 'multer';
import { uploadPhoto, listPhotos } from '../controllers/photoController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', listPhotos);
router.post('/upload', upload.single('photo'), uploadPhoto);

export default router;
