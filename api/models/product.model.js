import mongoose from "mongoose";
const Schema = mongoose.Schema;



const productSchema = new Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: [] },
    size: { type: []},
    color: { type:[] },
    price: { type: Number },
    inStock:{type:Boolean,default:true}
}, { timestamps: true });

export default mongoose.model('Product', productSchema)