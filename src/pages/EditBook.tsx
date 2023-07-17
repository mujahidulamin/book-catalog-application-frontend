/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import {
  useBookDetailsQuery,
  useUpdateBookMutation,
} from "../redux/features/books/booksApi";
import { Helmet } from "react-helmet";

interface IBook {
  email: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
}

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState<IBook>({
    email: "",
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    image: "",
  });

  // Call the useBookDetailsQuery hook
  let bookData: IBook | null = null;
  if (id) {
    const { data } = useBookDetailsQuery(id);
    bookData = data?.book;
  }

  // Update the bookInfo state when the bookData changes
  useEffect(() => {
    if (bookData) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setBookInfo(bookData);
    }
  }, [bookData, id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBookInfo({ ...bookInfo, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", "7a0cb87ba4d2a95c0e35ace4cb430bc5"); // Replace with your ImageBB API key

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );
        const imageUrl = response.data.data.url;
        setBookInfo({ ...bookInfo, image: imageUrl });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBookInfo({ ...bookInfo, [e.target.name]: e.target.value });
  };

  const [updateBook] = useUpdateBookMutation();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await updateBook({ id: id, data: bookInfo });
    if (response?.data) {
      swal(response?.data?.message, "", "success");
      if (id) {
        navigate(`/bookDetails/${id}`);
      }
      setIsLoading(false);
    } else {
      swal("Book update failed!", "", "error");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit a book</title>
      </Helmet>

      <h1 className="text-4xl font-bold mb-4 text-center mt-8 ">
        Edit Your Book
      </h1>

      <div className="max-w-lg mx-auto my-[50px] p-5 border">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">
              <span className="label-text font-bold text-sm">
                Name of the Author
              </span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookInfo.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="label">
              <span className="label-text font-bold text-sm">
                Select a Genre
              </span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={bookInfo.author}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="label">
              <span className="label-text font-bold text-sm">
                Select a Genre
              </span>
            </label>
            <select
              id="genre"
              name="genre"
              value={bookInfo.genre}
              onChange={handleSelectChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Drama">Horror</option>
              <option value="Drama">Detective</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="label">
              <span className="label-text font-bold text-sm">
                {" "}
                Select a Publication Date
              </span>
            </label>
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              value={bookInfo.publicationDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="label">
              <span className="label-text font-bold text-sm">
                {" "}
                Choose a image
              </span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border"
            />
          </div>
          {bookInfo.image && (
            <div className="mb-4">
              <img
                src={bookInfo.image}
                alt="Book Cover"
                className="max-w-full mb-2"
                height="350px"
                width="260px"
              />
            </div>
          )}
          {isLoading ? (
            <button
              disabled
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Loading...
            </button>
          ) : (
            <div className="text-center">
              <button
                type="submit"
                className="btn px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 my-2"
              >
                Update Book
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default EditBook;
