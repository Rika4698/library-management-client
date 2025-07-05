import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const bookApi = createApi({
    reducerPath:'bookApi',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api"}),
    tagTypes:["Books"],
    endpoints:(builder) =>({
        getBooks:builder.query({
            query:()=> "/books",
            providesTags:["Books"],
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
    }),


});

export const {
    useGetBooksQuery,
    useAddBookMutation,
    useGetBookByIdQuery,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookApi;