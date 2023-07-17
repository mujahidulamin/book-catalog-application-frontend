import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import AllBooks from "../pages/AllBooks";
import BookDetails from "../pages/BookDetails";
import AddNewBook from "../pages/AddNewBook";
import EditBook from "../pages/EditBook";
import PrivateRoute from "./PrivateRoute";
import SignIn from "../pages/SignIn";
import NotFound from "../components/ErrorPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allBooks",
        element: <AllBooks />,
      },
      {
        path: "/bookDetails/:id",
        element: <BookDetails />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-book/:id",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn></SignIn>,
  },
  {
    path: "/signUp",
    element: <Signup />,
  },
]);

export default routes;
