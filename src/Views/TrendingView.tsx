import { TrendingSubheader } from "../components/TrendingSubheader";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { ImageGrid } from "./../components/ImageGrid";
import { Pagination } from "./../components/Pagination";
import type { MediaResponse } from "./../core/Types";
import { mapToGridData } from "../mapToGridData.ts/mapToGridData";
import { useTmdb } from "../Hooks/useTmdb";
import { useState } from "react";
import { ButtonGroup } from "../components/ButtonGroup";

const TV_ENDPOINT = "https://api.themoviedb.org/3/trending/tv";
const MOVIE_ENDPOINT = "https://api.themoviedb.org/3/trending/movie";

export const TrendingView = () => {
  const { pathname } = useLocation();
  const [page, setPage] = useState<number>(1);

  const ENDPOINT = pathname.includes("tv") ? TV_ENDPOINT : MOVIE_ENDPOINT;

  const type = pathname.includes("tv") ? "tv" : "movie";

  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get("interval") || "day";
  const { data } = useTmdb<MediaResponse>(`${ENDPOINT}/${interval}`, {}, [
    interval,
    page,
    pathname,
  ]);

  const gridData = mapToGridData(data?.results ?? [], (result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <TrendingSubheader />
      <Outlet />
      <section className="max-w-[1200px] mx-auto p-5 space-y-5">
        <h1 className="text-3xl font-bold mb-4">{type}</h1>
        <ButtonGroup
          value={interval}
          onClick={(value: string) => {
            setSearchParams({ interval: value });
          }}
          options={[
            { label: "Day", value: "day" },
            { label: "Week", value: "week" },
          ]}
        />
        <ImageGrid results={gridData} getHref={(id) => `/${type}/${id}`} />
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      </section>
    </div>
  );
};
