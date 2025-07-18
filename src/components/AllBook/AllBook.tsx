
import { useDeleteBookMutation, useGetBooksQuery} from "@/redux/api/baseApi";
import type { Book } from "@/types/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';




const AllBook = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data, isLoading, isError } = useGetBooksQuery({page, limit});
    const[deleteBook] = useDeleteBookMutation();
    const navigate = useNavigate();

    const books = data?.data?.data;
//    console.log(data?.data?.meta?.page);

    const handleDelete = async (id: string) =>{
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
    };

    if(isLoading)
        return <p className="text-center mt-28 text-gray-600">Loading books...</p>;

    if (isError) return <p className="text-center text-red-500 mt-28">Failed to fetch books</p>;

    


    return (
        <div className="mt-20">
            <h2 className="text-center mt-[120px] text-purple-600 text-3xl font-bold">All Book</h2>
            <div className='max-w-7xl mx-auto px-4 py-8'>

                <div className='overflow-x-auto border rounded-lg shadow'>
                    <table className='min-w-full table-auto text-center text-sm'>
                        <thead className='bg-gray-100'>
                            <tr >
                                <th  className='px-4 py-2  text-gray-500 uppercase'>Title</th>
                                <th className='px-4 py-2 text-gray-500 uppercase'>Author</th>
                                <th className='px-4 py-2 text-gray-500 uppercase'>Genre</th>
                                <th className='px-4 py-2 text-gray-500 uppercase'>ISBN</th>
                                <th className='px-4 py-2 text-gray-500 uppercase'>Copies</th>
                                <th className='px-4 py-2 text-gray-500 uppercase'>Available</th>
                                <th className='px-4 py-2 text-gray-500 uppercase'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              Array.isArray(books) && books.length > 0 ? (
    books.map((book: Book) => (
      <tr key={book._id} className="border-t hover:bg-gray-50">
        <td className="px-4 py-2 text-sm whitespace-nowrap">{book.title}</td>
        <td className="px-4 py-2 text-sm font-medium whitespace-nowrap">{book.author}</td>
        <td className="px-4 py-2 text-sm ">{book.genre}</td>
        <td className="px-4 py-2 text-sm ">{book.isbn}</td>
        <td className="px-4 py-2 text-sm ">{book.copies}</td>
        <td className="px-4 py-2 text-sm ">
          {book.available ? (
            <span className="text-green-600 font-medium">Available</span>
          ) : (
            <span className="text-red-500 font-medium">Unavailable</span>
          )}
        </td>
        <td className="py-2 px-4 space-x-4 text-center whitespace-nowrap">
          <button onClick={() => navigate(`/books/${book._id}`)} className="px-4 py-2 bg-white hover:bg-sky-500 text-sky-500 hover:text-white border border-sky-600 font-medium rounded-lg">
            View
          </button>
          <button onClick={() => navigate(`/edit-book/${book._id}`)} className="px-4 py-2 bg-white hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-700 font-medium rounded-lg">
            Edit
          </button>
          <button onClick={() => navigate(`/borrow/${book._id}`)} disabled={!book.available} className={`px-4 py-2 border font-medium rounded-xl ${!book.available ? "bg-slate-600 text-white cursor-not-allowed" : "hover:bg-green-500 text-green-500 hover:text-white bg-white border-green-600"}`}>
            Borrow
          </button>
          <button onClick={() => handleDelete(book._id)} className="px-3 py-2 bg-white hover:bg-red-500 text-red-500 hover:text-white border border-red-600 font-medium rounded-lg">
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} className="text-center py-4">
        {Array.isArray(books) ? "No books found" : "Loading data..."}
      </td>
    </tr>
  )
                            }
                        </tbody>

                    </table>

                  

                  

                </div>
                  <div className="flex justify-center items-center gap-4 mt-10 mb-8">
                        <button onClick={() => setPage((prev) => Math.max(prev-1, 1))} disabled={page === 1} className="px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-30">
                            Previous
                        </button>
                        <span className="text-lg font-semibold text-purple-600">
                            page {data?.data?.meta?.page} of {data?.data?.meta?.totalPages}
                        </span>
                        <button onClick={()=> setPage((prev)=> prev +1)} disabled={page === data?.data?.meta?.totalPages} className="px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-30">
                         Next
                        </button>

                    </div>




            </div>

        </div>
    );
};

export default AllBook;