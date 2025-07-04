
import { z } from "zod";


export const bookSchema = z.object({
    title:z.string().min(1, "Title is required"),
    author:z.string().min(1, "Author is required"),
    genre:z.enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ], {required_error: "Genre is required"}),
    isbn:z.string().min(1, "ISBN is required"),
    description:z.string().optional(),
    copies:z
    .number({invalid_type_error: "Copies must be a number"})
    .int()
    .nonnegative("Copies must be 0 or more"),
    available:z.boolean().default(true).optional(),

});

export type bookSchemaValues = z.infer<typeof bookSchema>;