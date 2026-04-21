import { ImageGrid } from "../../components/ImageGrid";
import { Pagination } from "../../components/Pagination";
import { SearchBar } from "../../components/SearchBar";
import { mapToGridData } from "../../mapToGridData.ts/mapToGridData";
import { useDebounce } from "../../Hooks/useDebounce";
import { useTmdb } from "../../Hooks/useTmdb";
import { useEffect, useRef, useState } from "react";

type SearchMovieResponse = {
  results: Array<{
    id: number;
    poster_path: string | null;
    original_name: string;
  }>;
  total_pages: number;
  total_results: number;
};

const ENDPOINT = "https://api.themoviedb.org/3/search/tv";
const DELAY = 500;

export const SearchView = () => {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [page, setPage] = useState<number>(1);
  const maxPages = useRef<number>(1);
  const debouncedQuery = useDebounce(query, DELAY);
  const { data } = useTmdb<SearchMovieResponse>(
    ENDPOINT,
    { query: debouncedQuery, page },
    [debouncedQuery, page]
  );
  const gridData = mapToGridData(data?.results ?? [], (result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_name,
  }));

  useEffect(() => {
    setMessage("");
    setPage(1);
  }, [debouncedQuery]);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-10 space-y-5">
      <SearchBar value={query} onChange={setQuery} message={message} />
      {data.results.length ? (
        <>
          <ImageGrid results={gridData} getHref={(id) => `/person/${id}`} />
          <Pagination
            page={page}
            maxPages={maxPages.current}
            onClick={setPage}
          />
        </>
      ) : (
        message && <p className="text-center text-gray-400">{message}</p>
      )}
    </section>
  );
};
