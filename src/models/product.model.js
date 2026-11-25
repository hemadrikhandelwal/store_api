import mongoose from "mongoose";

// 1. Define the Schema (structure & validation)

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"]
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

//2. define model - modle name which is of which type 

const product = mongoose.model("Product", productSchema);

export default product
