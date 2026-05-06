import { useState } from "react";
import { Link } from "./Link";
import { SearchBar } from "./SearchBar";
import type { SearchType } from "../core/Types";
import { ButtonGroup } from "./ButtonGroup";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [type, setType] = useState<SearchType>("movie");

  return (
    <header>
      <nav className="flex gap-4 p-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-white-900">TMDB Explorer</h1>
        <Link to="/movies/now-playing" match={["movies/:options"]}>
          Movies
        </Link>
        <Link to="/tv/airing-today" match={["tv/:options"]}>
          TV
        </Link>
        <Link to="/trending/movie?interval=day" match={["trending/:media"]}>
          Trending
        </Link>
        <Link to="/genre/movies/action" match={["genre/:media/:genre"]}>
          Genres
        </Link>
        <div className="flex justify-between items-center gap-3">
          <SearchBar
            value={query}
            onChange={(query) => {
              setQuery(query);
              navigate(`/search?q=${query}&type=${type}`);
            }}
          />
          <ButtonGroup
            value={type}
            options={[
              { label: "Movies", value: "movie" },
              { label: "TV", value: "tv" },
              { label: "People", value: "person" },
            ]}
            onClick={(type) => {
              setType(type as SearchType);
              navigate(`/search?q=${query}&type=${type}`);
            }}
          />
        </div>
      </nav>
    </header>
  );
};
