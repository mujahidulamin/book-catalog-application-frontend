import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/hooks";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/users/usersSlice";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const { email } = useAppSelector((state) => state.users.user);
  console.log(email);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(setUser(null));
    Cookies.remove("token");
  };

  return (
    <nav>
      <div className="bg-sky-200 px-4 py-3 mx-auto sm:max-w-xl md:max-w-full md:px-24 lg:px-10 sticky top-0 z-50 header">
        <div className="relative flex items-center justify-between">
          <Link
            to="/"
            aria-label="Enviable Learning"
            title="Enviable Learning"
            className="inline-flex items-center"
          >
            <img className="h-12 " src={""} alt="" />
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              BookHub
            </span>
          </Link>
          <ul className="items-center hidden space-x-8 lg:flex">
            <li className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
              <NavLink
                to="/"
                aria-label="Home"
                title="Home"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allBooks"
                aria-label="allBooks"
                title="allBooks"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                All Books
              </NavLink>
            </li>

            {email && (
              <Link to="/addNewBook">
                <a className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                  Add New
                </a>
              </Link>
            )}

            {email ? (
              <>
                <li>
                  <button
                    onClick={handleLogout}
                    aria-label="Logout"
                    title="Logout"
                    className="font-medium tracking-wide text-red-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Logout
                  </button>
                </li>

                <li>
                  <div className="tooltip tooltip-bottom" data-tip={email}>
                    {email ? (
                      <img
                        className="rounded-full"
                        style={{ height: "40px" }}
                        src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740"
                        alt=""
                      />
                    ) : (
                      <div
                        className="tooltip tooltip-bottom"
                        data-tip="Profile"
                      >
                        <FaUserAlt></FaUserAlt>
                      </div>
                    )}
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/signIn"
                    aria-label="Sign In"
                    title="Sign In"
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signUp"
                    aria-label="Sign Up"
                    title="Sign Up"
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/wishlist"
                    aria-label="wishlist"
                    title="wishlist"
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/readingList"
                    aria-label="readingList"
                    title="readingList"
                    className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                  >
                    Reading List
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        to="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <img className="h-12 " src={""} alt="" />
                        <span className=" text-xl font-bold tracking-wide text-gray-800 uppercase">
                          BookHub
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <NavLink
                          to="/"
                          aria-label="Home"
                          title="Home"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400 "
                        >
                          Home
                        </NavLink>
                      </li>
                      <li className="">
                        <NavLink
                          to="/allBooks"
                          aria-label="allBooks"
                          title="allBooks"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          All Books
                        </NavLink>
                      </li>

                      <li>
                        {email && (
                          <Link to="/addNewBook">
                            <a className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                              Add New
                            </a>
                          </Link>
                        )}
                      </li>

                      {email ? (
                        <>
                          <li>
                            <button
                              onClick={handleLogout}
                              aria-label="Logout"
                              title="Logout"
                              className="font-medium tracking-wide text-red-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              Logout
                            </button>
                          </li>

                          <li>
                            <div
                              className="tooltip tooltip-bottom"
                              data-tip={email}
                            >
                              {email ? (
                                <img
                                  className="rounded-full"
                                  style={{ height: "40px" }}
                                  src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740"
                                  alt=""
                                />
                              ) : (
                                <div
                                  className="tooltip tooltip-bottom"
                                  data-tip="Profile"
                                >
                                  <FaUserAlt></FaUserAlt>
                                </div>
                              )}
                            </div>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <NavLink
                              to="/signIn"
                              aria-label="Sign In"
                              title="Sign In"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              Sign In
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/signUp"
                              aria-label="Sign Up"
                              title="Sign Up"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              Sign Up
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/wishlist"
                              aria-label="Sign Up"
                              title="Sign Up"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              Wishlist
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/readingList"
                              aria-label="readingList"
                              title="readingList"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              Reading List
                            </NavLink>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
