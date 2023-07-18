/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Card from "../components/Card";
import { useGetReadingListQuery } from "../redux/features/books/booksApi";
import swal from "sweetalert";

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

export const ReadSoon = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: books, isError, isSuccess } = useGetReadingListQuery(null);

  if (isError) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    swal("Something went wrong", "", "error");
  }

  return isSuccess ? (
    <div className="flex flex-col-reverse lg:flex-row">
      <div className="flex-1">
        <div className="py-16">
          <div className="xl:container m-auto space-y-12 px-6 md:px-12 lg:px-20">
            <div>
              <h2 className="mt-4 text-center text-2xl font-bold text-gray-900  md:text-4xl">
                Plan to read soon
              </h2>
            </div>
            {books?.books.length > 0 ? (
              <div className="mt-16 grid gap-8 sm:w-2/3 sm:mx-auto md:w-full md:grid-cols-2 md:-mx-8 lg:grid-cols-3">
                {books?.books.map((book: IBook, i: number) => (
                  <Card book={book} key={i} />
                ))}
              </div>
            ) : (
              <p className="text-center text-sky-600">
                There is no list to read now.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
