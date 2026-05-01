import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        🗳️ SmartVote
      </h1>
      <div className="space-x-6">
        <button
          onClick={() => navigate("/login")}
          className="hover:text-yellow-300"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="hover:text-yellow-300"
        >
          Signup
        </button>
        <button
          onClick={() => navigate("/vote")}
          className="hover:text-yellow-300"
        >
          Vote
        </button>
        <button
          onClick={() => navigate("/admin")}
          className="hover:text-yellow-300"
        >
          Admin
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
