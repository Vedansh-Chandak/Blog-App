import User from "../model/user-model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import token from "../model/token.js";

// SIGNUP USER API_CONTROLLER
export const signupUser = async (request, response)=>{
try {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(request.body.password, salt)  
  const user = {
    username: request.body.username, 
    name: request.body.name,
    password: hashedPassword
  };
  // console.log(user)

const newUser = new User(user);
await newUser.save();
return response.status(200).json({msg: "signup successfully"})
} catch (error) {
   return response.status(500).json({msg: 'error while signup'})
}
}

// LOGIN USER API_CONTROLLER

export const loginUser = async (request, response)=> {

     let user = await User.findOne({username: request.body.username});
     if(!user){
      return response.status(400).json({msg: "user not found"})
     }

     try {
   const match = await bcrypt.compare(request.body.password, user.password)
      if(match){
        //JWT AUTHENTICATION TOKEN
 const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
 const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET)

const newtoken =  new token({ token: refreshToken});
await newtoken.save();
return response.status(200).json({msg: "login successfully", accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username})
      }else{
        return response.status(400).json({msg: "invalid password"})
      }
     } catch (error) {
       return response.status(500).json({msg:" error while login"})
     }

    }
 