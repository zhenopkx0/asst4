import { ImageGrid } from '../../components/ImageGrid';
import { Pagination } from '../../components/Pagination';
import type { TvResponse } from '../../core/Types';
import { mapToGridData } from '../../mapToGridData.ts/mapToGridData';
import { useTmdb } from '../../Hooks/useTmdb';
import { useState } from 'react';

const ENDPOINT = 'https://api.themoviedb.org/3/genre/tv/list';

export const TvGenreView = () => {
  const [page, setPage] = useState<number>(1);
  const { data } = useTmdb<TvResponse>(ENDPOINT, { page }, [page]);

  const gridData = mapToGridData(data?.results ?? [], (result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <h1 className="text-3xl font-bold mb-4">TV</h1>
      <ImageGrid results={gridData} getHref={(id) => `/tv/${id}`} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};