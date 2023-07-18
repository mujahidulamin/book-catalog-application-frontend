/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "../../api/apiSlice";


//books api
const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (data) => ({
        url: `/books/add-book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addNewBook"],
    }),
    bookReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookReview"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/update-book/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["bookDetails"],
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteBook"],
    }),
    getAllBooks: builder.query({
      query: ({ search, genre, publicationYear }) => ({
        url: "/books/all-books",
        params: { search, genre, publicationYear },
        providesTags: ["addNewBook", "deleteBook"],
      }),
    }),
    getRecentBooks: builder.query({
      query: () => ({
        url: "/books/recent-published",
        providesTags: ["addNewBook"],
      }),
    }),
    bookDetails: builder.query({
      query: (id: string) => `/books/${id}`,
      providesTags: ["bookDetails", "bookReview"],
    }),

    createWishlist: builder.mutation({
      query: (bookData) => ({
        url: "/wishlist",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["wishlist"],
    }),

    getWishlist: builder.query({
      query: () => "/wishlist",
      providesTags: ["wishlist"],
    }),

    removeWishlist: builder.mutation({
      query: (bookId) => ({
        url: `/wishlist/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),

    createReadingList: builder.mutation({
      query: (bookData) => ({
        url: "/readingList",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["readingList"],
    }),

    getReadingList: builder.query({
      query: () => "/readingList",
      providesTags: ["readingList"],
    }),

    removeReadingList: builder.mutation({
      query: (bookId) => ({
        url: `/readingList/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["readingList"],
    }),
  }),
});

export const {
  useUpdateBookMutation,
  useAddBookMutation,
  useDeleteBookMutation,
  useGetAllBooksQuery,
  useBookDetailsQuery,
  useGetRecentBooksQuery,
  useBookReviewMutation,
  useCreateWishlistMutation,
  useGetWishlistQuery,
  useRemoveWishlistMutation,
  useCreateReadingListMutation,
  useGetReadingListQuery,
  useRemoveReadingListMutation
} = booksApi;
