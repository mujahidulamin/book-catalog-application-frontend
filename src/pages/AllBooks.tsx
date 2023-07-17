/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { Helmet } from "react-helmet";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../redux/features/books/booksApi";

interface IBook {
  _id: string;
  email: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  summary: string;
}

const AllBooks = () => {
  const genres = [
    "Fiction",
    "Fantasy",
    "Drama",
    "Comedy",
    "Horror",
    "Detective",
  ];

  const publicationYears = [
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ];

  // Filter Books
  const [selectGenre, setSelectGenre] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectPublicationYear, setSelectPublicationYear] = useState("");

  const { data: books, isLoading } = useGetAllBooksQuery({
    search: searchText,
    genre: selectGenre,
    publicationYear: selectPublicationYear,
  });

  return (
    <>
      <Helmet>
        <title>All Books</title>
      </Helmet>

      <div className="flex">
        {/* Sidebar */}
        {/* <div className="w-1/4 bg-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => {
                setSelectGenre("");
                setSelectPublicationYear("");
              }}
              className="text-[14px] bg-green-500 text-white px-[12px] py-[4px] rounded-[8px]"
            >
              Reset
            </button>
          </div>
         
          <div className="space-y-2">
            <div className="bg-white p-2 rounded">
              <h2 className="text-[15px] text-gray-400">By Genre:</h2>
              <div className="mt-2">
                {genres?.map((genre, i) => {
                  return (
                    <div key={i} className="flex items-center mb-[8px]">
                      <input
                        onChange={() => setSelectGenre(genre)}
                        className="h-[18px] w-[18px]"
                        id={genre}
                        type="radio"
                        name="genre"
                        checked={selectGenre === genre}
                      />
                      <label className="text-[14px] ml-3" htmlFor={genre}>
                        {genre}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white p-2 rounded">
              <div className="bg-white p-2 rounded">
                <h2 className="text-[15px] text-gray-400">
                  By Publication Year:
                </h2>
                <div className="mt-2">
                  {publicationYears?.map((year, i) => {
                    return (
                      <div key={i} className="flex items-center mb-[8px]">
                        <input
                          onChange={() => setSelectPublicationYear(year)}
                          className="h-[18px] w-[18px]"
                          id={year}
                          type="radio"
                          name="year"
                          checked={selectPublicationYear === year}
                        />
                        <label className="text-[14px] ml-3" htmlFor={year}>
                          {year}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="w-full space-y-1 dark:text-gray-100 mt-5 px-5">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="button"
                title="search"
                className="p-1 focus:outline-none focus:ring"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 dark:text-gray-100"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full py-2 pl-10 text-sm rounded-md  focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400 border border-gray-300 p-2"
              type="text"
              name="Search"
              placeholder="Search..."
            />
          </div>

          {/* All Books */}
          <div className="mt-[20px] mb-[100px] ">
            {isLoading ? (
              <div>
                <h3 className="text-3xl font-[500] text-center">Loading...</h3>
              </div>
            ) : (
              <div className="grid gap-12 row-gap-5 mb-12 lg:grid-cols-3 md:grid-cols-2 lg:row-gap-8 my-10">
                {books?.books?.map((book: IBook, i: number) => {
                  return (
                    <Link key={i} to={`/bookDetails/${book?._id}`}>
                      <Card book={book} />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBooks;
