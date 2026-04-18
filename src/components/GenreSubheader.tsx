import { Link } from './Link';

export const GenreSubheader = () => {
  return (
    <header>
      <nav className="flex gap-4 p-4 bg-gray-600">
        <Link to="/genre/tv">TV</Link>
        <Link to="/genre/movies">Movies</Link>
      </nav>
    </header>
  );
};