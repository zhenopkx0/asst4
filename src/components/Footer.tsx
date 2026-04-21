import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} TMDB Explorer. Built with React,
          Vite and React Router.
        </p>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-gray-500">
            Made by YOURS TRULY ❤️
          </span>

          <Link
            to="https://github.com/zhenopkx0/asst4.git"
            className="text-gray-400 hover:text-white transition-colors text-xl"
          >
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
};
