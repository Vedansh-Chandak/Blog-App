import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
},
picture: {
    type: String,
 required: false
},
createdDate :{
    type: String,
    requried: true
}
});

const post = mongoose.model('post', postSchema);

export default post;
