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
    }),


});

export const {
    useGetBooksQuery,
    useAddBookMutation,
} = bookApi;