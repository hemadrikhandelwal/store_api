import Product from "../models/product.model.js";

//POST request handler 

const addProduct = async (req, res) => {
    try {
        const { title, price, description, category, image } = req.body || {}
        const product = await Product.create({
            title, price, category, description, image
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        })
    }
    catch (error) {
        const statusCode = error.name === "ValidationError" ? 400 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const productList = await Product.find()
        res.status(200).json({
            message: "product fecthing successfully ",
            data: productList,
            success: true
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: " failed in fecthing product "
        })

    }
}

const getOneProduct = async (req, res) => {
    const { id } = req.params;
    try {

        const oneProduct = await Product.findById(id);
        if (!oneProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }
        return res.status(200).json({
            success: true,
            data: oneProduct,
            message: 'fetched data sucessfully'
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "fail in fecthing data"
        })
    }
}

const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "product not found "
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product delteed suceesfully",

        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: " fail to delete product "
        })
    }
}


const updateProduct = async (req, res) => {

    const { id } = req.params
    try {
        const { title, price, description, category, image } = req.body || {};
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, price, description, category, image },
            { returnDocument: "after", runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({
                success: true,
                message: " product not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "product updated sucessfully",
            data: updatedProduct
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to update "
        })
    }
}
export { addProduct, getAllProducts, getOneProduct, deleteProduct, updateProduct }