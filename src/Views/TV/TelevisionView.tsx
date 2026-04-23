import { ImageGrid } from "../../components/ImageGrid";
import { Pagination } from "../../components/Pagination";
import type { TvResponse } from "../../core/Types";
import { mapToGridData } from "../../mapToGridData.ts/mapToGridData";
import { useTmdb } from "../../Hooks/useTmdb";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TVSubheader } from "../../components/TVSubheader";

const POPULAR_ENDPOINT = "https://api.themoviedb.org/3/tv/popular";
const ONTHEAIR_ENDPOINT = "https://api.themoviedb.org/3/tv/on_the_air";
const TOPRATED_ENDPOINT = "https://api.themoviedb.org/3/tv/top_rated";
const AIRINGTODAY_ENDPOINT = "https://api.themoviedb.org/3/tv/airing_today";

export const TelevisionView = () => {
  const { pathname } = useLocation();
  const [page, setPage] = useState<number>(1);
  const ENDPOINT = pathname.includes("popular")
    ? POPULAR_ENDPOINT
    : pathname.includes("on-the-air")
    ? ONTHEAIR_ENDPOINT
    : pathname.includes("top-rated")
    ? TOPRATED_ENDPOINT
    : AIRINGTODAY_ENDPOINT;

  const { data } = useTmdb<TvResponse>(ENDPOINT, { page }, [page, pathname]);

  const gridData = mapToGridData(data?.results ?? [], (result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <TVSubheader />
      <Outlet />
      <section className="max-w-[1200px] mx-auto p-5 space-y-5">
        <ImageGrid results={gridData} getHref={(id) => `/tv/${id}`} />
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      </section>
    </div>
  );
};
