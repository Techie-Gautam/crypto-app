import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

function Error({ message }) {
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-red-100">
      <div className="bg-red-500 text-white font-semibold p-6 rounded-lg shadow-lg flex items-center space-x-4 transform transition-all duration-300 ease-in-out hover:scale-105">
        <FaExclamationTriangle className="text-3xl animate-bounce" />
        <h1 className="text-xl md:text-2xl">{message}</h1>
      </div>
    </div>
  );
}

export default Error;
