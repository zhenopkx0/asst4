import { useParams } from "react-router-dom";
import { movieGenres, tvGenres } from "../../core/Constants";
import { ImageGrid } from "../../components/ImageGrid";
import { Pagination } from "../../components/Pagination";
import { Link } from "../../components/Link";
import { useState } from "react";
import type { MediaResponse } from "../../core/Types";
import { useTmdb } from "../../Hooks/useTmdb";
import { mapToGridData } from "../../mapToGridData.ts/mapToGridData";
import { LinkGroup } from "../../components/LinkGroup";
import { ButtonGroup } from "../../components/ButtonGroup";

type SearchResponse = {
  results: Array<{
    id: number;
    name: string;
    profile_path: string | null;
  }>;
  total_pages: number;
  total_results: number;
};

type SearchMovieResponse = {
  results: Array<{
    id: number;
    poster_path: string | null;
    original_title: string;
  }>;
  total_pages: number;
  total_results: number;
};

type SearchTvResponse = {
  results: Array<{
    id: number;
    poster_path: string | null;
    original_name: string;
  }>;
  total_pages: number;
  total_results: number;
};

export const GenreView = () => {
  const { type: type } = useParams();
  const MOVIES_ENDPOINT = "https://api.themoviedb.org/3/search/movie";
  const TV_ENDPOINT = "https://api.themoviedb.org/3/search/tv";
  const PERSON_ENDPOINT = "https://api.themoviedb.org/3/search/person";

  const [page, setPage] = useState<number>(1);

  const endpoint =
    type === "movies"
      ? MOVIES_ENDPOINT
      : type === "tv"
      ? TV_ENDPOINT
      : PERSON_ENDPOINT;

  const { data } = useTmdb<
    SearchResponse | SearchMovieResponse | SearchTvResponse
  >(endpoint, { page }, [type, page]);

  let gridData;

  if (type === "movies") {
    const movieData = data as SearchMovieResponse;

    gridData = mapToGridData(movieData.results, (result) => ({
      id: result.id,
      imagePath: result.poster_path,
      primaryText: result.original_title,
    }));
  } else if (type === "tv") {
    const tvData = data as SearchTvResponse;

    gridData = mapToGridData(tvData.results, (result) => ({
      id: result.id,
      imagePath: result.poster_path,
      primaryText: result.original_name,
    }));
  } else {
    const personData = data as SearchResponse;

    gridData = mapToGridData(personData.results, (result) => ({
      id: result.id,
      imagePath: result.profile_path,
      primaryText: result.name,
    }));
  }

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <ButtonGroup options={[
        { label: "Movies", value: "movies" },
        { label: "TV", value: "tv" },
        { label: "People", value: "people" },
      ]} /> 
      {type=== "movies" ? (
        <h2 className="text-2xl font-bold">Movie Results</h2>
        ) : type === "tv" ? (
            <h2 className="text-2xl font-bold">TV Results</h2>
        ) : (
            <h2 className="text-2xl font-bold">People Results</h2>
        ) : type === "people" ? (
                <h2 className="text-2xl font-bold">People Results</h2>
                ) : null
            }
      <ImageGrid results={gridData} getHref={(id) => `/movie/${id}`} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
