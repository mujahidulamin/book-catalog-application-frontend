/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { useSignUpMutation } from "../redux/features/users/usersApi";
import swal from "sweetalert";
import { setLoading } from "../redux/features/users/usersSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [signUpMutation] = useSignUpMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const credential = { email, password };
      dispatch(setLoading(true));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await signUpMutation(credential);
      if (response.data) {
        swal(response?.data?.message, "", "success");
        navigate("/signIn");
        setEmail("");
        setPassword("");
      } else {
        swal(response?.error?.data?.message, "", "error");
      }
      dispatch(setLoading(false));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Sign-up failed:", error);
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <Navbar></Navbar>

      <div>
        <div className="max-w-md mx-auto my-[50px] p-5 border">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Create an Account
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={email}
                  type="email"
                  id="email"
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  defaultValue={password}
                  type="password"
                  id="password"
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {isLoading ? (
                <button
                  disabled
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors"
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 my-2 w-full"
                >
                  Sign Up
                </button>
              )}
              <p className="text-gray-700 text-md mt-4 text-center">
                Already have an account?{" "}
                <Link to="/signIn">
                  <a className="text-sky-500 font-semibold hover:text-sky-700">
                    Sign In
                  </a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Signup;
