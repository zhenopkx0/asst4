import { Link } from "./Link";
import { SearchBar } from "./SearchBar";

type HeaderProps = {
  query: string;
  setQuery: (value: string) => void;
};

export const Header = ({ query, setQuery }: HeaderProps) => {
  return (
    <header>
      <nav className="flex gap-4 p-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-white-900">TMDB Explorer</h1>
        <Link to="/movies/now-playing">Movies</Link>
        <Link to="/tv/airing-today">TV</Link>
        <Link to="/trending/movie?interval=day">Trending</Link>
        <Link to="/genre/movies/action">Genres</Link>
        <SearchBar value={query} onChange={setQuery} />
      </nav>
    </header>
  );
};
