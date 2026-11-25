import express from "express";
import cors from 'cors';
import ProductRoutes from "./routes/product.routes.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors())
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.status(200).json({ success: true, status: "ok" });
})


//Routes 
app.use('/api/products', ProductRoutes);
app.use(notFound)
app.use(errorHandler)


export default app;