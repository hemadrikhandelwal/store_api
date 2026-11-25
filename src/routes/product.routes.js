import express from "express";
import { addProduct, getAllProducts, getOneProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post('/', addProduct)
router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;