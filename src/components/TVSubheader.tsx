import { Link } from './Link';

export const TVSubheader = () => {
  return (
    <header>
      <nav className="flex gap-4 p-4 bg-gray-600">
        <Link to="/tv/airing-today">Airing Today</Link>
        <Link to="/tv/on-the-air">On The Air</Link>
        <Link to="/tv/popular">Popular</Link>
        <Link to="/tv/top-rated">Top Rated</Link>
      </nav>
    </header>
  );
};