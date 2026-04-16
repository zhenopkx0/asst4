import { Link } from './Link';

export const Subheader = () => {
  return (
    <header>
      <nav className="flex gap-4 p-4 bg-gray-600">
        <Link to="/movies/now-playing">Now Playing</Link>
        <Link to="/movies/popular">Popular</Link>
        <Link to="/movies/top-rated">Top Rated</Link>
        <Link to="/movies/upcoming">Upcoming</Link>
      </nav>
    </header>
  );
};