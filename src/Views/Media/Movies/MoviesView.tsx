import { Outlet, useLocation, useParams } from "react-router-dom";
import { Subheader } from "@/components/Subheader";
import { ImageGrid } from "@/components/ImageGrid";
import { Pagination } from "@/components/Pagination";
import type { MediaResponse } from "@/core/Types";
import { mapToGridData } from "@/mapToGridData.ts/mapToGridData";
import { useTmdb } from "@/Hooks/useTmdb";
import { useState } from "react";

const NOWPLAYING_ENDPOINT = "https://api.themoviedb.org/3/movie/now_playing";
const POPULAR_ENDPOINT = "https://api.themoviedb.org/3/movie/popular";
const TOPRATED_ENDPOINT = "https://api.themoviedb.org/3/movie/top_rated";
const UPCOMINGENDPOINT = "https://api.themoviedb.org/3/movie/upcoming";

export const MoviesView = () => {
  const { pathname } = useLocation();
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const ENDPOINT = pathname.includes("popular")
    ? POPULAR_ENDPOINT
    : pathname.includes("now-playing")
    ? NOWPLAYING_ENDPOINT
    : pathname.includes("top-rated")
    ? TOPRATED_ENDPOINT
    : UPCOMINGENDPOINT;

  const { data } = useTmdb<MediaResponse>(ENDPOINT, { page }, [page, pathname]);

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
      <Subheader />
      <Outlet />
      <section className="max-w-300 mx-auto p-5 space-y-5">
        <ImageGrid results={gridData} getHref={(id) => `/movie/${id}`} />
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      </section>
    </div>
  );
};
