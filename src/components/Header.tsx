import { Link } from './Link';

export const Header = () => {
  return (
    <header>
      <nav className="flex gap-4 p-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-white-900">TMDB Explorer</h1>
        <Link to="/movies/now-playing">Movies</Link>
        <Link to="/tv/airing-today">TV</Link>
        <Link to="/trending/movie?interval=day">Trending</Link>
        <Link to="/search">Search</Link>
      </nav>
    </header>
  );
};