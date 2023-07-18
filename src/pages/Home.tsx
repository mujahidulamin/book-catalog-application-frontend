/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Helmet } from "react-helmet";
import Card from "../components/Card";
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
      </div>

      <div>
        <h1 className="text-center text-4xl font-bold mt-12">
          Recently Added Books
        </h1>

        <div
          className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full
        lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
        >
          <div className="grid gap-12 row-gap-5 mb-8 lg:grid-cols-3 md:grid-cols-2 lg:row-gap-8">
            {books?.books?.map((book: IBook, i: number) => {
              return (
                <Card book={book} key={i}/>
                // <Link key={i} to={`/bookDetails/${book._id}`}>
                  
                // </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
