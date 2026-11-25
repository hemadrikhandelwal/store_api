import express from "express";
import cors from 'cors';
import ProductRoutes from "./routes/product.routes.js";

const app = express();

app.use(cors())
app.use(express.json())


//Routes 
app.use('/api/products', ProductRoutes);


export default app;