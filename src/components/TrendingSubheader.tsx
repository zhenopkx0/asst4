import { Link } from './Link';

export const TrendingSubheader = () => {
  return (
    <header>
      <nav className="flex gap-4 p-4 bg-gray-600">
        <Link to="/trending/movie">Movies</Link>
        <Link to="/trending/tv">TV</Link>
      </nav>
    </header>
  );
};