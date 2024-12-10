import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js";
import bycriptjs from "bcryptjs"




export const signUp = async (req, res, next) => {
 const {username, email, password} = req.body;
 if(!username || !email || !password || username === '' || email === '' || password === ''){
  //  return res.status(400).json({messege: "All fields are required"})
 return next(errorHandler(400, 'All fields are required'))
 }

 const hashedPassword = bycriptjs.hashSync(password, 10);

 const newUser = new User({
    username,
    email,
    password: hashedPassword,
 })
try {
 await newUser.save();
 res.status(200).json({messege: "Signup succesful"})
} catch (error) {
    next(error)
}
 

}