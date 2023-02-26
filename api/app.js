import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();



app.use(cors());
app.use(express.json());
app.use(cookieParser())


//router
import authRouter from './routes/auth.route.js'
app.use('/auth', authRouter);
import userRouter from './routes/user.route.js'
app.use('/users', userRouter);
import productRouter from './routes/product.route.js'
app.use('/products', productRouter);
import cartRouter from './routes/cart.route.js'
app.use('/carts', cartRouter);
import orderRouter from './routes/order.route.js'
app.use('/orders', orderRouter);
import checkoutRouter from './routes/stripe.js'
app.use('/checkout', checkoutRouter);



mongoose
    .set('strictQuery', true)
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

// err handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
});



app.listen(5000, () => {
    console.log("App listening on 5000")
})