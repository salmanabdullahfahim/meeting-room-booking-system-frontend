import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import AboutUs from "../pages/AboutUs";
import ErrorPage from "../pages/ErrorPage";
import AllRoomsPage from "@/pages/AllRoomsPage";
import { RoomDetails } from "@/pages/RoomDetails";
import ProtectedRoute from "./ProtectedRoute";
import Booking from "@/pages/Booking";
import Checkout from "@/pages/checkout";
import MyBookings from "@/pages/Mybookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meetings-rooms",
        element: <AllRoomsPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/meetings-rooms/:id",
        element: (
          <ProtectedRoute role="user">
            <RoomDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking/:id",
        element: (
          <ProtectedRoute role="user">
            <Booking />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute role="user">
            {" "}
            <Checkout />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <ProtectedRoute role="user">
            {" "}
            <MyBookings />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
