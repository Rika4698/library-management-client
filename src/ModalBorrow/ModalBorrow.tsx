import { borrowSchema, type BorrowFormValues } from "@/lib/validation/book.schema";
import { useBorrowBookMutation, useGetBookByIdQuery } from "@/redux/api/baseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";





const ModalBorrow:React.FC = () =>{
    const navigate = useNavigate();
    const{bookId} = useParams<{bookId:string}>();
    
    const {data, isError} = useGetBookByIdQuery(bookId);
    const bookData = data?.data;
    

    const [borrowBook,{isLoading}] = useBorrowBookMutation();
    const [maxCopies, setMaxCopies] = useState<number>(0);

    const { register, handleSubmit, watch, formState:{errors}, } = useForm<BorrowFormValues>({
        resolver: zodResolver(borrowSchema), defaultValues:{
            book:bookId || "", quantity:1, dueDate:'',
        },
    });
    useEffect(() =>{
        if(bookData){
            setMaxCopies(bookData.copies);
        }
    }, [bookData]);

    const quantityValue = watch("quantity");

    if(!bookId)
        return <p className="text-center mt-20 text-red-500">Invalid book ID</p>;

    if (isError || !bookData) {
    return <p className="text-center mt-10 text-red-500">Failed to load book data</p>;
  }

    if(!bookData.available){
        return <p className="text-center mt-20 text-red-500 ">Sorry, this book is currently unavailable.</p>
    }


    const onSubmit = async (data:BorrowFormValues) =>{
        if(data.quantity > maxCopies){
            toast.error(`Cannot Borrow more than ${maxCopies} copies`);
            return;
        }
        
        try{
            await borrowBook(data).unwrap();
            toast.success("Book borrowed successfully");
            
            navigate('/borrow-summary');
        }  catch (err : unknown){
                const error= err as {data?:{message?:string}};
                toast.error(error?.data?.message || "Failed to borrow book");
            }
    };


    return (
        <div className="max-w-xl mx-auto mt-28 p-6 border rounded shadow">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Borrow Book</h2>
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
            <div>
                <label htmlFor="quantity" className="block font-medium">
                    Quantity (max {maxCopies})
                </label>
                <input id="quantity" type="number" min={1} max={maxCopies} {...register("quantity",{valueAsNumber:true})} className={`border rounded px-2 py-1 w-full ${quantityValue > maxCopies ? "border-red-500":""}`}  required/>
                {errors.quantity && (<p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>)}
                {quantityValue > maxCopies && (<p className="text-red-500 text-sm mt-1">Quantity cannot exceed available copies ({maxCopies})</p>)}
            </div>

            <div>
                <label htmlFor="dueDate" className="block font-medium">Due Date</label>
                <input type="date" id="dueDate" {...register("dueDate")} className="border rounded px-2 py-1 w-full" required/>
                {errors.dueDate && (<p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>)}
            </div>

            <button type="submit" disabled={isLoading || quantityValue > maxCopies} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50">{isLoading?"Borrowing...":"Borrow"}</button>
            </form> 
        </div>
    );
};

export default ModalBorrow;