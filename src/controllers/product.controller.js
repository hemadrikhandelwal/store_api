import Product from "../models/product.model.js";

//POST request handler 

const addProduct = async (req, res, next) => {
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
        next(error)
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        const productList = await Product.find()
        res.status(200).json({
            message: "product fecthing successfully ",
            data: productList,
            success: true
        })
    }
    catch (error) {
        next(error)

    }
}

const getOneProduct = async (req, res, next) => {
    const { id } = req.params;
    try {

        const oneProduct = await Product.findById(id);
        if (!oneProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }
        return res.status(200).json({
            success: true,
            data: oneProduct,
            message: 'fetched data suceesfully'
        })
    }
    catch (err) {
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
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
        next(error)
    }
}


const updateProduct = async (req, res, next) => {

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
                success: false,
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
        next(error)
    }
}
export { addProduct, getAllProducts, getOneProduct, deleteProduct, updateProduct }