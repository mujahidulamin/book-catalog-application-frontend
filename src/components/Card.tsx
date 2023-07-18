/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Link } from "react-router-dom";
import {
  useCreateReadingListMutation,
  useCreateWishlistMutation,
  useRemoveReadingListMutation,
  useRemoveWishlistMutation,
} from "../redux/features/books/booksApi";
import { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineClockCircle,
  AiFillClockCircle,
} from "react-icons/ai";
import swal from "sweetalert";

interface IBook {
  book: {
    _id: string;
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    image: string;
  };
}

const Card = ({ book }: IBook) => {
  const { _id, image, title, author, genre, publicationDate } = book;

  const [createWishlist] =
    useCreateWishlistMutation();
  const [removeWishlist] =
    useRemoveWishlistMutation();
  const [createReading] =
    useCreateReadingListMutation();
  const [removeReading] =
    useRemoveReadingListMutation();

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddedToReading, setIsAddedToReading] = useState(false);

  const handleWishlist = () => {
    if (isInWishlist) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      removeWishlist(_id)
        .then(() => {
          setIsInWishlist(false);
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          swal("Removed from Wishlist", "", "success");
          removeBookFromLocalStorage("wishlist", _id);
        })
        .catch(() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          swal("Error removing from Wishlist", "", "error");
        });
    } else {
      createWishlist(book)
        .unwrap()
        .then(() => {
          setIsInWishlist(true);
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          swal("Added to Wishlist Successfully", "", "success");
          addBookToLocalStorage("wishlist", _id);
        })
        .catch(() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          swal("Error adding to Wishlist", "", "error");
        });
    }
  };

  const handleAddToReading = () => {
    if (isAddedToReading) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      removeReading(_id!)
        .unwrap()
        .then(() => {
          setIsAddedToReading(false);
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          swal("Removed from Reading List", "", "success");
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          removeBookFromLocalStorage("readingList", _id!);
        })
        .catch(() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          swal("Error removing from Reading List", "", "error");
        });
    } else {
      createReading(book)
        .unwrap()
        .then(() => {
          setIsAddedToReading(true);
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          swal("Added to Reading List", "", "success");
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          addBookToLocalStorage("readingList", _id!);
        })
        .catch(() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          swal("Error adding to Reading List", "", "error");
        });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-type-assertion
    setIsInWishlist(checkBookInLocalStorage("wishlist", _id!));
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    setIsAddedToReading(checkBookInLocalStorage("readingList", _id!));
  }, [_id]);

  const addBookToLocalStorage = (listKey: string, bookId: string) => {
    const storedList = localStorage.getItem(listKey);
    if (storedList) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const list = JSON.parse(storedList);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      list.push(bookId);
      localStorage.setItem(listKey, JSON.stringify(list));
    } else {
      localStorage.setItem(listKey, JSON.stringify([bookId]));
    }
  };

  const removeBookFromLocalStorage = (listKey: string, bookId: string) => {
    const storedList = localStorage.getItem(listKey);
    if (storedList) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const list = JSON.parse(storedList);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const updatedList = list.filter((id: string) => id !== bookId);
      localStorage.setItem(listKey, JSON.stringify(updatedList));
    }
  };

  const checkBookInLocalStorage = (listKey: string, bookId: string) => {
    const storedList = localStorage.getItem(listKey);
    if (storedList) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const list = JSON.parse(storedList);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return list.includes(bookId);
    }
    return false;
  };

  return (
    <div className="transform hover:translate-y-2 hover:shadow-xl transition duration-300">
      <div className="bg-gray-100 p-6 rounded shadow-lg">
        <img
          className="object-cover w-full mb-6 rounded shadow-lg xl:h-80"
          src={image}
          alt=""
        />
        <div>
          <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">
            {title}
          </p>
          <p className="text-gray-700 md:mt-2  font-bold ">Author: {author}</p>
          <p className="text-gray-700 md:mt-2  font-bold ">Genre: {genre}</p>
          <p className="text-gray-700 md:mt-2  font-bold ">
            Published Date: {publicationDate}
          </p>

          <div className="flex justify-center mt-5">
            <Link to={`/bookDetails/${_id}`}>
              <button className="btn px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 my-2">
                view details
              </button>
            </Link>
          </div>

          <div className="flex justify-center my-8 gap-10">
            <button onClick={handleWishlist} className="">
              {isInWishlist ? (
                <AiFillHeart className="text-red-500 text-2xl transition duration-300 group-hover:text-red-700" />
              ) : (
                <AiOutlineHeart className="text-gray-600  text-2xl transition duration-300 group-hover:text-red-500" />
              )}
            </button>

            <button
              onClick={handleAddToReading}
              className=""
            >
              {isAddedToReading ? (
                <AiFillClockCircle className="text-blue-500 text-2xl transition duration-300 group-hover:text-blue-700" />
              ) : (
                <AiOutlineClockCircle className="text-gray-600  text-2xl transition duration-300 group-hover:text-blue-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
