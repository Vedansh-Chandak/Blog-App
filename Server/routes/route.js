import express from 'express';
import { signupUser, loginUser } from '../Controller/user-controller.js';
import { uploadImage, getImage } from '../Controller/image-controller.js';
import upload from '../utils/upload.js';
import { createPost, getAllPosts } from '../Controller/post-contoller.js';
import { authenticateToken } from '../Controller/jwt-controller.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);

export default router;
