import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="text-center mt-12 font-sans flex justify-center flex-col items-center">
      <img
        src="https://media.geeksforgeeks.org/wp-content/uploads/20230802153215/Error-404.png"
        alt="Error"
        className="w-96 mb-5 mx-auto"
      />
      <h1 className="text-4xl text-gray-800 font-bold">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className=" mt-2 text-lg text-white bg-green-500 px-4 py-2 rounded no-underline"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
