import { Link, Outlet } from "react-router-dom";
import { MovieGenres, TvGenres } from "../../core/Constants";


export const GenreView = ({
  setSelectedGenre,
}: {
  setSelectedGenre: (id: number) => void;
}) => {
  return (
    <>
    <div>
      {MovieGenres.map((genre) => (
        <button key={genre.id} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-400 transition-colors" onClick={()=> setSelectedGenre(genre.id)}>
        {genre.name}
        </button>
      ))}
    </div>
    <div>
      {TvGenres.map((genre) => (
        <button key={genre.id} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-400 transition-colors" onClick={()=> setSelectedGenre(genre.id)}>
        {genre.name}
        </button>
      ))}
    </div>
    <div>
      <Link to="/genre/movies" className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-colors">Movies</Link>
      <Link to="/genre/tv" className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-colors">TV</Link>
      <Outlet/>
      </div>
    </>
  );
};