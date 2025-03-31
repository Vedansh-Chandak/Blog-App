import grid from 'gridfs-stream';
import mongoose from 'mongoose';

// Initialize GridFS
grid.mongo = mongoose.mongo;
let gfs, gridFsBucket;
const url = "http://localhost:8000"; 

const Conn = mongoose.connection;

// Ensure GridFS Initialization After Connection Opens
Conn.once('open', () => {
  console.log('MongoDB connected, initializing GridFS');
  
  gridFsBucket = new mongoose.mongo.GridFSBucket(Conn.db, {
    bucketName: 'photos'
  });

  gfs = grid(Conn.db, mongoose.mongo);
  gfs.collection('photos');
});

// Upload Image
export const uploadImage = (request, response) => {
  console.log('File received:', request.file);

  if (!request.file) {
    return response.status(404).json({ msg: "File not found" });
  }

  const imageUrl = `${url}/file/${request.file.filename}`;
  console.log('Image URL:', imageUrl); 
  return response.status(200).json({ imageUrl });
};

// Get Image
export const getImage = async (request, response) => {
  try {
    console.log('Fetching image:', request.params.filename);
    
    const file = await gfs.files.findOne({ filename: request.params.filename });
    if (!file) {
      console.log('File not found:', request.params.filename);
      return response.status(404).json({ msg: 'File not found' });
    }

    console.log('File found, streaming image...');
    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    console.error('Error in getImage:', error.message);
    return response.status(500).json({ msg: error.message });
  }
};
