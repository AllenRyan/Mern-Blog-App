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
        validUser = await User.findOne({email}).select('-password');
        console.log(validUser)
        const token = jwt.sign(
            {id: validUser._id},
            process.env.JWT_SECRET,
        );
        console.log(validUser._id)
        res.status(200).cookie("access_token", token,{
           httpOnly: true
        }).json(validUser)
    } catch (error) {
        next(error)
    }
}

//google auth
export const google = async (req, res, next) => {
    const {name, email, googlePhotoUrl} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            user = await User.findOne({email}).select('-password');
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(user)

        } else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bycriptjs.hashSync(generatePassword, 10);
            let newUser = User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePic: googlePhotoUrl,
            })
            await newUser.save();
            console.log('newUser', newUser)
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            newUser = await User.findOne({email}).select('-password')
            res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(newUser)
        }
      
    } catch (error) {
        next(error)
    }
}