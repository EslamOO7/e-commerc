import Order from '../models/order.model.js'
import { createError } from '../util/Errors.js';

//CREATE Order
export const createOrder = async (req, res, next) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        console.log(newOrder);
        res.status(200).json(newOrder);

    } catch (error) {
        next(error)
    }
};

//UPDATE Order
export const updateOrder = async (req, res, next) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateOrder);
    } catch (error) {
        next(error)
    }
};

//DELETE Order
export const deleteOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('Order Deleted  Successfully')
    } catch (error) {
        next(error)
    }
};

// GET Order
export const getOrder = async (req, res, next) => {

    try {
        const Orders = await Order.find({ userId: req.params.id });
        res.status(200).json(Orders);
    } catch (error) {
        next(error)
    }
};
//GET ALL OrderS

export const getAllOrders = async (req, res, next) => {
    try {
        const Orders = await Order.find();
        res.status(200).json(Orders);
    } catch (error) {
        next(error)
    }
};

export const getStatsIncome = async (req, res, next) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        next(err)
    }
}