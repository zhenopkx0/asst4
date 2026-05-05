import { useLocation, useParams } from "react-router-dom";
import { movieGenres, tvGenres } from "../../core/Constants";
import { ImageGrid } from "../../components/ImageGrid";
import { Pagination } from "../../components/Pagination";
import { Link } from "../../components/Link";
import { useState } from "react";
import type { MediaResponse } from "../../core/Types";
import { useTmdb } from "../../Hooks/useTmdb";
import { mapToGridData } from "../../mapToGridData.ts/mapToGridData";
import { LinkGroup } from "../../components/LinkGroup";
import { GENRE_MAP } from "../../core/Constants";

export const GenreView = () => {
  const { media, genre } = useParams();
  if (!media || !genre) {
    return <p className="text-center text-gray-400">Invalid route</p>;
  }
  const { pathname } = useLocation();
  const MOVIES_ENDPOINT = "https://api.themoviedb.org/3/discover/movie";
  const TV_ENDPOINT = "https://api.themoviedb.org/3/discover/tv";

  const type = pathname.includes("tv") ? "tv" : "movie";

  const [page, setPage] = useState<number>(1);

  let genreId: number | undefined;

  if (media === "movies") {
    genreId = GENRE_MAP.movies[genre as keyof typeof GENRE_MAP.movies];
  }

  if (media === "tv") {
    genreId = GENRE_MAP.tv[genre as keyof typeof GENRE_MAP.tv];
  }

  const { data } = useTmdb<MediaResponse>(
    media === "movies" ? MOVIES_ENDPOINT : TV_ENDPOINT,
    { page, with_genres: genreId },
    [page, genre, media]
  );

  const gridData = mapToGridData(data?.results ?? [], (result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title ?? result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <LinkGroup
        options={[
          {
            label: "Movies",
            to: "/genre/movies/action",
          },
          { label: "TV", to: "/genre/tv/action" },
        ]}
      />
      {media === "movies" ? (
        <div>
          {movieGenres.map((genre) => (
            <Link key={genre.value} to={`/genre/movies/${genre.value}`}>
              {genre.name}
            </Link>
          ))}
        </div>
      ) : (
        <div>
          {tvGenres.map((genre) => (
            <Link key={genre.value} to={`/genre/tv/${genre.value}`}>
              {genre.name}
            </Link>
          ))}
        </div>
      )}
      <ImageGrid results={gridData} getHref={(id) => `/${type}/${id}`} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
