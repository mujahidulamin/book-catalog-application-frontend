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
    </div>
  );
};

export default Card;
