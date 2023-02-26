import Product from '../models/product.model.js'
import { createError } from '../util/Errors.js';

//CREATE PRODUCT
export const createProduct = async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json(newProduct);
    } catch (error) {
        next(error)
    }
};

//UPDATE PRODUCT
export const updateProduct = async (req, res, next) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateProduct);
    } catch (error) {
        next(error)
    }
};

//DELETE PRODUCT
export const deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('PRODUCT Deleted  Successfully')
    } catch (error) {
        next(error)
    }
};

//GET ALL PRODUCTS

export const getAllProducts = async (req, res, next) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (error) {
        next(error)
    }
};

// GET PRODUCT
export const getProduct = async (req, res, next) => {

    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
};


