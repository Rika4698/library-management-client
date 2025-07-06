import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const bookApi = createApi({
    reducerPath:'bookApi',
    baseQuery: fetchBaseQuery({baseUrl: "https://library-management-server-liard.vercel.app/api"}),
    
    tagTypes:["Books", "BorrowSummary"],
    endpoints:(builder) =>({
        getBooks: builder.query({
        query: (params) => ({
          url: "/books",
          method: "GET",
         params, // Accepts { page, limit }
      }),
        providesTags: ["Books"],
    }),

        addBook:builder.mutation({
            query:(data) => ({
                url:"/books",
                method:"POST",
                body:data,
            }),
            invalidatesTags:["Books"],
        }),

        getBookById:builder.query({
            query:(id) =>({
                url:`/books/${id}`,
                method:"GET",

            }),
            providesTags:["Books"],
        }),

        updateBook: builder.mutation({
            query:({id,...data}) => ({
                url:`/books/${id}`,
                method:'PUT',
                body:data,
            }),
            invalidatesTags:['Books'],
        }),


        deleteBook: builder.mutation({
            query:(id) => ({
                url:`/books/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Books'],
        }),

        borrowBook: builder.mutation({
            query:(data) =>({
                url:"/borrow",
                method:"POST",
                body:data,
            }),
            invalidatesTags:['Books', 'BorrowSummary'],
        }),

        getBorrowSummary: builder.query({
            query:() => '/borrow',
            providesTags:['BorrowSummary'],
        }),
    }),


});

export const {
    useGetBooksQuery,
    useAddBookMutation,
    useGetBookByIdQuery,
    useUpdateBookMutation,
    useDeleteBookMutation,
    useBorrowBookMutation,
    useGetBorrowSummaryQuery,
} = bookApi;