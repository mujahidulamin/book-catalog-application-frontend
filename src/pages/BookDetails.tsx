/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import {
  useBookDetailsQuery,
  useBookReviewMutation,
  useDeleteBookMutation,
} from "../redux/features/books/booksApi";
import { useAppSelector } from "../redux/hooks/hooks";

interface IBook {
  _id: string;
  email: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  summary: string;
  customerReviews: [];
}

const BookDetails = () => {
  const navigate = useNavigate();
  const { email } = useAppSelector((state) => state.users.user);

  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<IBook | null>(null);

  // Call the useBookDetailsQuery hook
  let bookData: IBook | null = null;
  let isLoader: boolean | false = false;
  if (id) {
    const { data, isLoading } = useBookDetailsQuery(id);
    bookData = data?.book;
    isLoader = isLoading;
  }

  // Update the bookInfo state when the bookData changes
  useEffect(() => {
    if (bookData) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setBook(bookData);
    }
  }, [bookData, id]);

  // Book Delete
  const [deleteBook] = useDeleteBookMutation();
  const [isDeleteLoad, setDeleteLoad] = useState(false);
  const handleDeleteBook = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["Cancel", "Yes"],
      dangerMode: false,
    }).then(async (willDelete) => {
      if (willDelete) {
        if (id) {
          setDeleteLoad(true);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response: any = await deleteBook(id);
          if (response?.data) {
            swal(response?.data?.message, "", "success");
            navigate("/allBooks");
            setDeleteLoad(false);
          } else {
            swal("Book delete operation failed!", "", "error");
            setDeleteLoad(false);
          }
        }
      }
    });
  };

  // Review add for book
  const [addReview] = useBookReviewMutation();
  const [reviewComment, setReviewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await addReview({
      id: id,
      data: { email: email, comment: reviewComment },
    });
    if (response?.data) {
      setReviewComment("");
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Book Details</title>
      </Helmet>

      <div className="container mx-auto py-8">
        {isLoader ? (
          <div className="text-center">
            <div className="flex justify-center items-center mt-48 mb-48">
              <div
                className="spinner-border animate-spin border-cyan-500 inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden"></span>
              </div>
            </div>
          </div>
        ) : book ? (
          <div>
            <div className="flex justify-center">
              <img
                src={book.image}
                alt={book.title}
                className="max-w-full rounded shadow-lg"
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-center">
                <h2 className="text-lg mb-2">
                  <span className="font-bold"> Title: </span>
                  {book.title}
                </h2>
              </div>
              <div className="flex justify-center">
                <p className="text-lg mb-2">
                  <span className="font-bold">Author:</span> {book.author}
                </p>
              </div>
              <div className="flex justify-center">
                <p className="text-lg mb-2">
                  <span className="font-bold">Genre:</span> {book.genre}
                </p>
              </div>
              <div className="flex justify-center">
                <p className="text-lg mb-2">
                  <span className="font-bold">Publication Year:</span>{" "}
                  {moment(book.publicationDate).format("DD MMMM, YYYY")}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-center mt-8 mb-8">
                <Link to={`/editBook/${book._id}`}>
                  {email === book?.email && (
                    <button className="btn btn-success flex items-center px-4 py-[3px] mr-3">
                      <FaEdit className="text-[18px] mr-2" /> <span>Edit</span>
                    </button>
                  )}
                </Link>
                {email === book?.email &&
                  (isDeleteLoad ? (
                    <button
                      disabled
                      className="flex items-center px-4 py-[3px]  ml-3"
                    >
                      Loading...
                    </button>
                  ) : (
                    <button
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onClick={handleDeleteBook}
                      className="btn btn-error flex items-center px-4 py-[3px] ml-3"
                    >
                      <FaTrash className="text-[18px] mr-2" />{" "}
                      <span>Delete</span>
                    </button>
                  ))}
              </div>

              {email && (
                <form onSubmit={handleAddReview}>
                  <label
                    htmlFor="review"
                    className="flex justify-center font-bold lg:text-4xl md:text-2xl text-xl mb-8 "
                  >
                    Give your review about the book
                  </label>
                  <textarea
                    id="review"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Give your review about the book"
                    className="textarea textarea-bordered textarea-xs w-full"
                  ></textarea>
                  {isLoading ? (
                    <button
                      disabled
                      className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                      Loading...
                    </button>
                  ) : (
                    <div className="flex justify-center mt-5">
                      <button
                        type="submit"
                        className="btn px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                      >
                        Submit Review
                      </button>
                    </div>
                  )}
                </form>
              )}

              <h3 className="text-xl font-bold mt-6">Reviews</h3>
              <div className="mb-4">
                {book?.customerReviews?.length > 0 ? (
                  <ul className="space-y-4">
                    {book?.customerReviews?.map(
                      (review: { email: string; comment: string }, index) => (
                        <li key={index} className="flex items-start mt-4">
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740"
                            alt="User Profile"
                          />
                          <div className="ml-4">
                            <p className="font-[600]">{review.email}</p>
                            <p className="py-2 rounded">{review.comment}</p>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>There is no reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Book not found.</p>
        )}
      </div>
    </>
  );
};

export default BookDetails;
