import Cart from '../models/cart.model.js'
import { createError } from '../util/Errors.js';

//CREATE CART
export const createCart = async (req, res, next) => {
    try {
        const newCart = new Cart(req.body);
        await newCart.save();
        res.status(200).json(newCart);
    } catch (error) {
        next(error)
    }
};

//UPDATE Cart
export const updateCart = async (req, res, next) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateCart);
    } catch (error) {
        next(error)
    }
};

//DELETE Cart
export const deleteCart = async (req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('Cart Deleted  Successfully')
    } catch (error) {
        next(error)
    }
};

// GET Cart
export const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id });
        res.status(200).json(cart);
    } catch (error) {
        next(error)
    }
};
//GET ALL CartS

export const getAllCarts = async (req, res, next) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        next(error)
    }
};
