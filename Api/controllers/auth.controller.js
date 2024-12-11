import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js";
import bycriptjs from "bcryptjs";
import jwt from "jsonwebtoken";




export const signUp = async (req, res, next) => {
 const {username, email, password} = req.body;
 if(!username || !email || !password || username === '' || email === '' || password === ''){
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

//sign in 

export const signIn = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password || email === '' || password === '' ){
       return next(errorHandler(400, 'All fields are required'))
    }
    try {
        let validUser = await User.findOne({email});
        if(!validUser){
           return next(errorHandler(400, 'User Not Found'));
        }
        const validPassword = bycriptjs.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(400, 'Invalid Password'));
        }
        validUser = await User.find({email}).select('-password');
        const token = jwt.sign(
            {id: validUser._id},
            process.env.JWT_SECRET,
        );
        res.status(200).cookie("access_token", token,{
           httpOnly: true
        }).json(validUser)
    } catch (error) {
        next(error)
    }
}