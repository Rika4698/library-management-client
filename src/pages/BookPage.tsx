import { useGetBookByIdQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router-dom";


const BookPage = () => {
    const {id} = useParams<{id:string}>();
    const navigate = useNavigate();
    const {data, isLoading, isError} = useGetBookByIdQuery(id);
    
    const book = data?. data;

    if(isLoading) return <p className="text-center text-gray-600 mt-20">Loading book details...</p>

    if(isError || !book)
        return <p className="text-center text-gray-600 mt-20">Book not found</p>
    return (
        <div>
        <div className='max-w-5xl mx-auto p-4 mt-32 items-center justify-center flex lg:text-xl'>
            <div className="justify-center items-center ">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">{book.title}</h2>
            <h3 className="font-medium rounded-3xl bg-purple-500 text-white py-1 px-2 w-fit">Author: <span className=" text-gray-900"> {book.author}</span></h3>
            <h3 className="mt-2 font-medium text">Genre: <span className="text-purple-600">{book.genre}</span></h3>
            <h3 className="mt-2 ">ISBN: <span>{book.isbn}</span></h3>
            <h3 className={`mt-2 font-medium ${book.copies === 0 ? "text-red-500" :"text-green-600"}`}>Copies: <span>{book.copies}</span></h3>
            <h3 className={`font-medium text-sm mt-1 ${book.available?"text-green-600":"text-red-500"}`}>{book.available?"Available":"Unavailable"}</h3>
            <h3 className="font-semibold text-blue-600 mt-4 text-lg">Description:</h3>
            <p className="w-[300px] lg:w-[500px] ">{book.description || "No description available"}</p>

            <div className="mt-9">
        <button onClick={() => navigate(-1)} className="rounded-lg bg-gray-800 text-white px-4 py-2 font-medium">Back </button>
      </div>
            </div>

            
            
        </div>
        
        </div>
    );
};

export default BookPage;