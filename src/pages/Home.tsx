/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Helmet } from "react-helmet";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useGetRecentBooksQuery } from "../redux/features/books/booksApi";
import Banner from "../components/Banner";

interface IBook {
  _id: string;
  email: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  customerReviews: [];
}

const Home = () => {
  const { data: books } = useGetRecentBooksQuery(undefined);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="w-full mx-auto">
        <Banner></Banner>

        <div className="mt-[20px] mb-[100px]">
          <h3 className="text-[20px] font-[500] text-left mb-[20px]">
            Recently Added Books
          </h3>
          <div className="grid grid-cols-3 gap-x-10 gap-y-10">
            {books?.books?.map((book: IBook, i: number) => {
              return (
                <Link key={i} to={`/details/${book._id}`}>
                  <Card book={book} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
