import { useAddBookMutation } from "@/redux/api/baseApi";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { bookSchema, type bookSchemaValues } from "@/lib/validation/book.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";





const AddBook = () => {

    const navigate = useNavigate();
    const [Books, {isLoading}] = useAddBookMutation();


    const {register, handleSubmit, formState:{errors},} = useForm<bookSchemaValues>({
        resolver:zodResolver(bookSchema),defaultValues: {
    available: true, },
    });

    const onSubmit = async (data: bookSchemaValues) =>{
        try{
            await Books(data).unwrap();
            toast.success(
                 
                 "Book created successfully!",
            );
            navigate('/books');

        } catch(err: unknown){
            const error= err as {data?:{message?:string}};
             toast.error(error?.data?.message || "Something went wrong");
        }
           
        
    };

    
    return (
        <div className="mt-20">
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-4xl mx-auto p-4">
            <h2 className="text-center mt-8 text-3xl text-purple-600 font-bold">Add New Book</h2>
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

      <Button type="submit" disabled={isLoading} className="bg-purple-500 hover:bg-purple-700">
        {isLoading ? "Creating..." : "Create Book"}
      </Button>
    </form>  
        </div>
    );
};

export default AddBook;