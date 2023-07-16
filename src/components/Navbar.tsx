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
          <ul className="flex items-center hidden space-x-8 lg:flex">
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
              <Link to="/add-new-book">
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
                          <Link to="/add-new-book">
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

      {/* <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-start">
            <div className="flex-shrink-0">
              <img
                height="45px"
                width="45px"
                src="https://www.cityofsachse.com/ImageRepository/Document?documentID=7216"
                alt="logo"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/">
                  <a className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                </Link>
                <Link to="/all-books">
                  <a className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                    All Books
                  </a>
                </Link>
                {email && (
                  <Link to="/add-new-book">
                    <a className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                      Add New
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="group inline-block">
                <button
                  onClick={handleToggleProfile}
                  className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
                    alt="User Profile"
                  />
                </button>
                <ul
                  className={`${
                    isShowProfile ? "" : "hidden"
                  } absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2`}
                >
                  {email && (
                    <li className="block px-4 py-2 text-sm font-bold hover:bg-gray-100">
                      {email}
                    </li>
                  )}
                  {email ? (
                    <li onClick={handleLogout}>
                      <a className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign Out
                      </a>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to="/signup">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Sign Up
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/login">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Log In
                          </a>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={handleToggle}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4.5C3 4.22386 3.22386 4 3.5 4H20.5C20.7761 4 21 4.22386 21 4.5C21 4.77614 20.7761 5 20.5 5H3.5C3.22386 5 3 4.77614 3 4.5ZM3 9.5C3 9.22386 3.22386 9 3.5 9H20.5C20.7761 9 21 9.22386 21 9.5C21 9.77614 20.7761 10 20.5 10H3.5C3.22386 10 3 9.77614 3 9.5ZM3.5 14C3.22386 14 3 14.2239 3 14.5C3 14.7761 3.22386 15 3.5 15H20.5C20.7761 15 21 14.7761 21 14.5C21 14.2239 20.7761 14 20.5 14H3.5ZM3.5 19C3.22386 19 3 19.2239 3 19.5C3 19.7761 3.22386 20 3.5 20H20.5C20.7761 20 21 19.7761 21 19.5C21 19.2239 20.7761 19 20.5 19H3.5Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
