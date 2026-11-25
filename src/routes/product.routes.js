import express from "express";
import { addProduct, getAllProducts, getOneProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createProductSchema } from "../validators/product.validators.js";

const router = express.Router();

router.post('/', validate(createProductSchema), addProduct)
router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;