import moment from "moment";

interface IBook {
  book: {
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    image: string;
  };
}

const Card = ({ book }: IBook) => {

  const {image, title, author, genre, publicationDate} = book

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
          <p className="text-gray-700 md:mt-2  font-bold ">
            Author: {author}
          </p>
          <p className="text-gray-700 md:mt-2  font-bold ">
            Genre: {genre}
          </p>
          <p className="text-gray-700 md:mt-2  font-bold ">
            Published Date: {publicationDate}
          </p>
        </div>
      </div>

      {/* <div className="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
        <figure className="mb-2">
          <img src={book.image} alt="" className="h-64 ml-auto mr-auto" />
        </figure>
        <div className="rounded-lg p-4 bg-[#2563EB] flex flex-col">
          <div>
            <h5 className="text-white text-xl font-bold">{book.title}</h5>
            <span className="text-sm text-white">Author: {book.author}</span>
          </div>
          <div className="flex items-center">
            <div className="text-lg text-white font-light">
              Genre: {book.genre}
            </div>
          </div>
          <p className="text-[14px] text-white">
            Published by {moment(book.publicationDate).format("DD MMMM, YYYY")}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Card;
