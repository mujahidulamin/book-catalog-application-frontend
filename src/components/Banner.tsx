import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">WELCOME TO THE </h1>
          <h1 className="mb-5 text-5xl font-bold">BOOKHUB</h1>
          <p className="mb-5">
            "Books are windows to new worlds, Where wisdom and stories unfurl.
            In pages bound, treasures are found, Inspiring hearts, minds, and
            souls."
          </p>
          <Link to={"/allBooks"}>
            <button className="btn ">See All Books</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
