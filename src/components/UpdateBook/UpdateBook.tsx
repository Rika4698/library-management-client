
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useGetBookByIdQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import { bookSchema, type bookSchemaValues } from "@/lib/validation/book.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Textarea } from "../ui/textarea";


const UpdateBook = () => {
    const{id} = useParams<{id:string}>();
    const navigate = useNavigate();

    const{data, isLoading, isError} = useGetBookByIdQuery(id);
    const book = data?.data;
    const [updateBook] = useUpdateBookMutation();

    const {register, handleSubmit, reset, formState:{errors}} = useForm<bookSchemaValues>({
        resolver: zodResolver(bookSchema),defaultValues: {
    available: true, },
    });

    useEffect(()=>{
        if(book){
            reset({
                title:book.title,
                author:book.author,
                genre:book.genre,
                isbn:book.isbn,
                description:book.description,
                copies:book.copies,
                available:book.available,

            });
        }
    }, [book, reset]);

    const onSubmit =async (data: bookSchemaValues) =>{
        try{
            await updateBook({id:id, ...data}).unwrap();
            toast.success("Book updated successfully");
            navigate(-1);
        } catch(err: unknown){
            const error= err as {data?:{message?:string}};
             toast.error(error?.data?.message || "Failed to update book");
        }
    };
    if(isLoading)
        return <p className="text-gray-600 text-center mt-20">Loading book data...</p>

    if(isError)
        return <p className="text-gray-600 text-center mt-20">Error loading book data...</p>
    return (
        <div className="mt-20">
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-4xl mx-auto p-4">
            <h2 className="text-center mt-8 text-3xl text-purple-700 font-bold">Update Book</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  mt-16 mx-auto ">
      <div className="mb-4">
        <Label htmlFor="title" className="text-purple-700 font-semibold text-lg">Title:</Label>
        <Input id="title" placeholder="Enter Title" {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div className="mb-4">
        <Label htmlFor="author" className="text-purple-700 font-semibold text-lg">Author:</Label>
        <Input id="author" placeholder="Enter Author Name" {...register("author")} />
        {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
      </div>

      <div className="mb-4">
        <Label htmlFor="genre" className="text-purple-700 font-semibold text-lg">Genre:</Label>
        <select id="genre" {...register("genre")} className="w-full p-2 border rounded">
          <option value="">Select Genre</option>
          <option value="FICTION">Fiction</option>
          <option value="NON_FICTION">Non-Fiction</option>
          <option value="SCIENCE">Science</option>
          <option value="HISTORY">History</option>
          <option value="BIOGRAPHY">Biography</option>
          <option value="FANTASY">Fantasy</option>
        </select>
        {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
      </div>

      <div className="mb-4">
        <Label htmlFor="isbn" className="text-purple-700 font-semibold text-lg">ISBN:</Label>
        <Input id="isbn" placeholder="Enter ISBN" {...register("isbn")} />
        {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn.message}</p>}
      </div>

      <div className="mb-4">
        <Label htmlFor="description" className="text-purple-700 font-semibold text-lg">Description:</Label>
        <Textarea id="description" rows={4} placeholder="Enter Description" {...register("description")} />
      </div>

      <div className="mb-4">
        <Label htmlFor="copies" className="text-purple-700 font-semibold text-lg">Copies:</Label>
        <Input id="copies" type="number" {...register("copies", { valueAsNumber: true })}  />
        {errors.copies && <p className="text-red-500 text-sm">{errors.copies.message}</p>}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Label htmlFor="available" className="text-purple-700 font-semibold text-lg">Available</Label>
        <input id="available" type="checkbox" {...register("available")} />
      </div>

      </div>

      <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-800">
        {isLoading ? "Updating..." : "Update Book"}
      </Button>
    </form>  
        </div>
    );
};

export default UpdateBook;