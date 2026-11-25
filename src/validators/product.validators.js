import { z } from "zod";
export const createProductSchema = z.object({
    title: z
        .string({ error: "Title is required" })
        .trim()
        .min(2, "Title must be at least 2 characters")
        .max(120, "Title cannot exceed 120 characters"),
    price: z.coerce
        .number({ error: "Price must be a valid number" })
        .min(0, "Price cannot be negative"),
    description: z
        .string({ error: "Description is required" })
        .trim()
        .min(5, "Description must be at least 5 characters")
        .max(1000, "Description cannot exceed 1000 characters"),
    category: z
        .string({ error: "Category is required" })
        .trim()
        .min(2, "Category must be at least 2 characters"),
    image: z
        .string({ error: "Image URL is required" })
        .trim()
        .url("Image must be a valid URL (e.g., https://...)"),
});