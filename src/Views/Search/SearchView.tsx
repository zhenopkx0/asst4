import { useSearchParams } from "react-router-dom";
import { ImageGrid } from "../../components/ImageGrid";
import { Pagination } from "../../components/Pagination";
import { useTmdb } from "../../Hooks/useTmdb";
import { mapToGridData } from "../../mapToGridData.ts/mapToGridData";
import { useState } from "react";

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

export const SearchView = () => {
  const MOVIES_ENDPOINT = "https://api.themoviedb.org/3/search/movie";
  const TV_ENDPOINT = "https://api.themoviedb.org/3/search/tv";
  const PERSON_ENDPOINT = "https://api.themoviedb.org/3/search/person";
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const type = searchParams.get("type") ?? "movie";

  const endpoint =
    type === "movie"
      ? MOVIES_ENDPOINT
      : type === "tv"
      ? TV_ENDPOINT
      : PERSON_ENDPOINT;

  const { data } = useTmdb<
    SearchResponse | SearchMovieResponse | SearchTvResponse
  >(endpoint, { page, query }, [type, page, endpoint, query]);

  let gridData;
  if (type === "movie") {
    const movieData = data as SearchMovieResponse;
    gridData = (movieData?.results ?? []).map((result) => ({
      id: result.id,
      imagePath: result.poster_path,
      primaryText: result.original_title,
    }));
  } else if (type === "tv") {
    const tvData = data as SearchTvResponse;

    gridData = mapToGridData(tvData.results ?? [], (result) => ({
      id: result.id,
      imagePath: result.poster_path,
      primaryText: result.original_name,
    }));
  } else {
    const personData = data as SearchResponse;

    gridData = mapToGridData(personData.results ?? [], (result) => ({
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
      <ImageGrid results={gridData} getHref={(id) => `/${type}/${id}`} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
