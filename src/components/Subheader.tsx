import { Link } from './Link';

export const Subheader = () => {
  return (
    <header>
      <nav className="flex gap-4 p-4 bg-gray-600">
        <Link to="/now-playing">Now Playing</Link>
        <Link to="/popular">Popular</Link>
        <Link to="/top-Rated">Top Rated</Link>
        <Link to="/upcoming">Upcoming</Link>
      </nav>
    </header>
  );
};