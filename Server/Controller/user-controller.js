import User from "../model/user-model.js";

export const signupUser = async (request, response)=>{
try {
    const user = request.body;
  console.log(user)
const newUser = new User(user);
await newUser.save();
return response.status(200).json({msg: "signup successfully"})
} catch (error) {
   return response.status(500).json({msg: 'error while signup'})
}
}