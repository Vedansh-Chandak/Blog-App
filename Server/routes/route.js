import express from 'express';
import { signupUser, loginUser  } from '../Controller/user-controller.js';
import { uploadImage } from '../Controller/image-controller.js';
import upload from '../utils/upload.js'
const router = express.Router();
router.post('/signup', signupUser);
router.post('/login', loginUser)
router.post('/file/upload', upload.single('file'), uploadImage)
export default router;