import { response } from 'express';
import  Post from '../model/post.js'

export const createPost = async(request, response)=>{
  try {
    const post = await new Post(request.body)
    post.save();
    return response.status(200).json('Post saved successfully')
  } catch (error) {
    return response.status(400).json({msg: "post is not saved"})
  }

}

export const getAllPosts = async(req, response) => {
  try {
    const posts = await Post.find(); // Ensure this is correct
    res.status(200).json(posts);
} catch (error) {
    res.status(500).json({ message: "Server error" });
}

}