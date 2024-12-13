import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bycriptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
    if(req.user.id != req.params.userId){
        return next(errorHandler(403, 'You are not allowed to update this user'))
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400, 'password must be at least 6 characters'))
        }
    }
  
    req.body.password = bycriptjs.hashSync(req.body.password, 10);
   

    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20 ){
            return next(errorHandler(400, 'username must be between 7 and 20 characters'))
        }
    
    if(req.body.username.includes(' ')){
        return next(errorHandler(400, 'username cannot contain spaces'))
    }
    if(req.body.username != req.body.username.toLowerCase()){
        return next(errorHandler(400, 'username must be lowercase'))
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)){
         return next(errorHandler(400, 'username can only contain numbers and letters'))
    }
    }
    try {
        let updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
        }, {new: true});
        updatedUser = await User.findById(req.params.userId).select('-password');
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
   
}