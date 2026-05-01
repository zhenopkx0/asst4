import { useSearchParams } from "react-router-dom";
import { ImageGrid } from "../../components/ImageGrid";
import { Pagination } from "../../components/Pagination";
import { useTmdb } from "../../Hooks/useTmdb";
import { useState } from "react";
import type { GridData } from "../../core/Types";

type SearchResponse = {
  results: Array<{
    id: number;
    name: string;
    original_title: string;
    original_name: string;
    poster_path: string | null;
    profile_path: string | null;
  }>;
  total_pages: number;
  total_results: number;
};

export const SearchView = () => {
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const type = searchParams.get("type") ?? "movie";
  const endpoint = `https://api.themoviedb.org/3/search/${type}`;

  const { data } = useTmdb<SearchResponse>(endpoint, { page, query }, [
    type,
    page,
    endpoint,
    query,
  ]);

  const gridData: GridData[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path ?? result.profile_path,
    primaryText:
      type === "movie"
        ? result.original_title
        : type === "tv"
        ? result.original_name
        : result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-300 mx-auto p-5 space-y-5">
      <ImageGrid results={gridData} getHref={(id) => `/${type}/${id}`} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
