import User from '../models/user.model.js'
import CryptoJS from 'crypto-js';
import Jwt from 'jsonwebtoken';
import {createError} from '../util/Errors.js';


export const register = async (req, res, next) => {
    try {
        const newUser = new User({
            ...req.body,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        })
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return next(createError(404, "User not found!!!"))
        }
        const isPasswordCorrect = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const Originalpassword = isPasswordCorrect.toString(CryptoJS.enc.Utf8);
        if (Originalpassword !== req.body.password) {
            return next(createError(401, "Wrong password"));
        }
        const token = Jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SEC,{expiresIn:"2d"})
        const { password, isAdmin, ...otherDetails } = user._doc; //to show some fild
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails,token,isAdmin})
    } catch (error) {
        next(error);
    }
};
