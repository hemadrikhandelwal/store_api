export const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
}

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || " Internal Server Error ";

    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path} : ${err.value}`;

    }
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((e) => e.message)
            .join(", ");
    }

    // MongoDB duplicate key error (useful if you add unique fields later)
    if (err.code === 11000) {
        statusCode = 400;
        message = "Duplicate field value entered";
    }
    res.status(statusCode).json({
        success: false,
        message,
        // Show stack trace only in development, hide in production
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
}