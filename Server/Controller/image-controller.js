import mongoose from 'mongoose';
const url = 'http://localhost:8000';

let gridfsBucket;
const conn = mongoose.connection;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
});

export const uploadImage = (request, response) => {
    console.log(request.file);
    if (!request.file) {
        return response.status(404).json({ error: "File not found" });
    }
    
    const imageUrl = `${url}/file/${request.file.filename}`;
    response.status(200).json({ imageUrl });
};

export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}