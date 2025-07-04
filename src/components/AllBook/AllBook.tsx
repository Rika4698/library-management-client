import { useDeleteBookMutation, useGetBooksQuery} from "@/redux/api/baseApi";
import type { Book } from "@/types/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';




const AllBook = () => {
    const { data, isLoading, isError } = useGetBooksQuery(undefined);
    const[deleteBook] = useDeleteBookMutation();
    const navigate = useNavigate();


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
        return <p className="text-center mt-10 text-gray-600">Loading books...</p>;

    if (isError) return <p className="text-center text-red-500 mt-10">Failed to fetch books</p>;

    


    return (
        <div className="mt-20">
            <h2 className="text-center mt-[120px] text-purple-600 text-3xl font-bold">All Book</h2>
            <div className='max-w-7xl mx-auto px-4 py-8'>

                <div className='overflow-x-auto border rounded-lg shadow'>
                    <table className='min-w-full table-auto text-center text-sm'>
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='px-4 py-2 text-gray-500 uppercase'>Title</th>
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
                                data?.data?.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-4">No books found</td>
                                    </tr>
                                ) : (
                                    data?.data?.map((book: Book) => (
                                        <tr key={book._id} className="border-t hover:bg-gray-50">
                                            <td className="px-4 py-2 text-sm ">{book.title}</td>
                                            <td className="px-4 py-2 text-sm font-medium">{book.author}</td>
                                            <td className="px-4 py-2 text-sm ">{book.genre}</td>
                                            <td className="px-4 py-2 text-sm ">{book.isbn}</td>
                                            <td className="px-4 py-2 text-sm ">{book.copies}</td>
                                            <td className="px-4 py-2 text-sm ">{book.available ? (<span className="text-green-600 font-medium">Available</span>
                                            ) : <span className="text-red-500 font-medium">Unavailable</span>}</td>
                                            <td className="py-2 px-4 space-x-4  text-center whitespace-nowrap">

                                                <button onClick={() => navigate(`/edit-book/${book._id}`)} title="Edit" className="px-4 py-2 bg-white hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-600 font-medium rounded-lg">
                                                    Edit
                                                </button>
                                                <button className={`px-4 py-2 border font-medium rounded-xl ${!book.available?"bg-slate-600 text-white cursor-not-allowed":"hover:bg-green-500 text-green-500 hover:text-white bg-white  border-green-600 "}`} disabled={!book.available}>
                                                    Borrow
                                                </button>
                                                <button onClick={()=> handleDelete(book._id)} className="px-3 py-2 bg-white hover:bg-red-500 text-red-500 hover:text-white border border-red-600 font-medium rounded-lg" >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                )
                            }
                        </tbody>

                    </table>

                </div>
            </div>

        </div>
    );
};

export default AllBook;