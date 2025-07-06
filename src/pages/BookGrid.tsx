import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/types";
import toast from "react-hot-toast";


const BookGrid = () => {
    const navigate = useNavigate();
    const{data, isLoading, isError} = useGetBooksQuery(undefined);
    const book = data?.data?.data;
    // console.log(book);
    const[deleteBook]= useDeleteBookMutation();

    const handleDelete = async (id:string) =>{
          if (!id) {
            toast.error("Invalid Book ID");
            return;
          } 
                const willDelete = await swal({
                    title:"Are you sure?",
                    text:"Do you really want to delete this book?",
                    icon:"warning",
                    buttons: {
                        confirm:{
                            text:"Yes, delete it!",
                            value:true,
                            className:"bg-red-600 text-white font-semibold px-4 py-2 rounded",
                        },
                        cancel:{
                            text:"Cancel",
                            value:false,
                            visible:true,
                            className:"bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded",
                        },
                    },
                    dangerMode:true,
                });
        
                if(willDelete){
                    try{
                        await deleteBook(id).unwrap();
                        toast.success("Book deleted successfully");
                    } catch (err : unknown){
                        const error= err as {data?:{message?:string}};
                        toast.error(error?.data?.message || "Failed to delete book");
                    }
                }

    }


    if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} className="h-40 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError || !book) {
    return <p className="text-center text-red-500 mt-28">Failed to load books.</p>;
  }

    return (
        <div className="mt-28">
           <h2 className="text-5xl font-bold text-center text-purple-600 mb-8">Books</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mx-auto">
            {
                book.slice(0,6).map((item: Book) => (
                       <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="shadow-lg hover:shadow-xl transition duration-300">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-purple-900">{item.title}</h3>
                <p className="rounded-full w-fit bg-purple-500 text-white px-3 font-semibold">Author: {item.author}</p>
                <p className="text-gray-600">Genre: {item.genre}</p>
                <p className="text-sm text-gray-500 font-medium">ISBN: {item.isbn}</p>
                <p className={`font-medium ${item.copies > 0 ?"text-green-600":"text-red-500"}`}>Copies: {item.copies}</p>
                <p className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
                <div className="flex justify-between gap-2 pt-3">
                  <Button size="sm" onClick={() => navigate(`/books/${item._id}`)}>View</Button>

                  <Button size="sm" className="bg-white hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-700 " onClick={() => navigate(`/edit-book/${item._id}`)}>Edit</Button>

                   <Button onClick={() => navigate(`/borrow/${item._id}`)}  title="Borrow" className={`px-4 py-2 border font-medium rounded-xl ${!item.available?"bg-slate-600 text-white cursor-not-allowed":"hover:bg-green-500 text-green-500 hover:text-white bg-white  border-green-600 "}`} disabled={!item.available}>
                                                    Borrow
                                                </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item._id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
                ))
            }

            
            </div>

            
            <div className="flex justify-center items-center mt-10">
                <button onClick={() => navigate(`/books`)} className="text-xl text-purple-600 font-semibold hover:underline">See more -</button> 
             </div>

        </div>
    );
};

export default BookGrid;