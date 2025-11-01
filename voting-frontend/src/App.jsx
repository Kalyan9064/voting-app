import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">🗳 Voting App</h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default App;
