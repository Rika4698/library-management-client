
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


export const borrowSchema = z.object({
  book: z.string().min(1, "Book ID is required"),
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine(
      (dateStr) => !isNaN(Date.parse(dateStr)),
      "Due date must be a valid date"
    ),
});

export type BorrowFormValues = z.infer<typeof borrowSchema>;