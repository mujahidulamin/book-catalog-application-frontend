/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useAppSelector } from "../redux/hooks/hooks";
import { useAddBookMutation } from "../redux/features/books/booksApi";
import swal from "sweetalert";
import { useNavigate } from "react-router";

interface IBookInfo {
  email: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  summary?: string;
  customerReviews?: [];
}

const AddNewBook = () => {
  const navigate = useNavigate();

  const { email } = useAppSelector((state) => state.users.user);

  const [isLoad, setIsLoad] = useState(false);

  const [addBook] = useAddBookMutation();

  const [bookInfo, setBookInfo] = useState<IBookInfo>({
    email: "",
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    image: "",
    summary: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setBookInfo({ ...bookInfo, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", "de29cf88aa178b3a6967e0556b301592"); // Replace with your ImageBB API key

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Perform book submission logic here
    if (email) {
      bookInfo.email = email;
      bookInfo.customerReviews = [];
    }
    setIsLoad(true);
    const response: any = await addBook(bookInfo);
    if (response?.data) {
      swal(response?.data?.message, "", "success");
      // Reset the form fields
      setBookInfo({
        email: "",
        title: "",
        author: "",
        genre: "",
        publicationDate: "",
        image: "",
        summary: "",
      });
      navigate("/allBooks");
      setIsLoad(false);
    } else {
      swal("Book Added Failed", "", "error");
      setIsLoad(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add New Book</title>
      </Helmet>
      
      <h2 className="text-4xl font-bold mb-4 text-center mt-8">
        Add a New Book
      </h2>
      <div className="max-w-md mx-auto my-[50px] p-5 border">
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-bold text-sm">
                Name of the Title
              </span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookInfo.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="label">
              <span className="label-text font-bold text-sm">
                Name of the Author
              </span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={bookInfo.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
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
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Select Genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
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
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
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
              required
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
          {isLoad ? (
            <button
              disabled
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Loading...
            </button>
          ) : (
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 my-2"
              >
                Add Book
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AddNewBook;
