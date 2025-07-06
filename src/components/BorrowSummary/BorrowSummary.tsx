import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import type { BorrowSummary } from "@/types/types";


const Borrowsummary = () => {
    const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);
    const borrow: BorrowSummary[] = data?.data || [];

    if (isLoading) {
        return <p className="text-center mt-28 text-gray-600">Loading borrow summary....</p>
    }

    if (isError) {
        return <p className="text-center mt-28 text-red-500">Failed to load borrow summary.</p>
    }

    

    return (
        <div className="mt-28">
            <h2 className="text-4xl font-bold mb-6 text-center text-purple-700">Borrow Summary</h2>
            <div className="max-w-6xl mx-auto  p-6 ">
                <div className="overflow-x-auto border rounded-lg shadow">
                    <table className="min-w-full table-auto text-center text-sm">
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='px-4 py-2 text-gray-500 uppercase'>Book Title</th>
                                <th className='px-4 py-2 text-gray-500 uppercase'>ISBN</th>
                                <th className='px-4 py-2 text-gray-500 uppercase whitespace-nowrap'>Total Quantity Borrowed</th>

                            </tr>

                        </thead>
                        <tbody>
                            {
                                borrow.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center text-gray-600 py-4">No borrowed books found.</td>
                                    </tr>
                                ) : (
                                    borrow?.map(({_id,book,totalQuantity}) => (
                                        <tr key={_id} className="border-t hover:bg-gray-50">
                                            <td className="px-4 py-2 text-sm whitespace-nowrap">{book.title}</td>
                                            <td className="px-4 py-2 text-sm font-medium whitespace-nowrap">{book.isbn}</td>
                                            <td className="px-4 py-2 text-sm text-green-600 font-medium">{totalQuantity}</td>
                                            
                                          

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

export default Borrowsummary;