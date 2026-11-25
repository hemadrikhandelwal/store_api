import express from "express";
import cors from 'cors';
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import ProductRoutes from "./routes/product.routes.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
);
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.status(200).json({ success: true, status: "ok" });
})

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: false,
    message: {
        success: false,
        message: " Too many requests, please try again after 15 minutes. "
    }
})

app.use(apiLimiter);


//Routes 
app.use('/api/products', ProductRoutes);
app.use(notFound)
app.use(errorHandler)


export default app;