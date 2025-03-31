import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE_NAME = 'blog-app';

const storage = new GridFsStorage({
  url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.vmi6l.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (request, file) => {
    return new Promise((resolve, reject) => {
      const match = ["image/png", "image/jpg", "image/jpeg"];
      if (!match.includes(file.mimetype)) {
        console.log('Unsupported file type:', file.mimetype);
        return reject(new Error('File type not supported'));
      }
      resolve({
        bucketName: "photos",
        filename: `${Date.now()}-blog-${file.originalname}`,
      });
    });
  },
});

storage.on('connection', () => {
  console.log('MongoDB connected successfully');
});

storage.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

export default multer({ storage });
