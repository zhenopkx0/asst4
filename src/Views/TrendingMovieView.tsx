import { ButtonGroup } from '../components/ButtonGroup';
import { ImageGrid } from '../components/ImageGrid';
import type { MediaResponse } from '../core/Types';
import { mapToGridData } from '../mapToGridData.ts/mapToGridData';
import { useTmdb } from '../Hooks/useTmdb';
import { useSearchParams } from 'react-router-dom';

const ENDPOINT = 'https://api.themoviedb.org/3/trending/movie';

export const TrendingMovieView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'day';
  const { data } = useTmdb<MediaResponse>(`${ENDPOINT}/${interval}`, {}, [interval]);

  const gridData = mapToGridData(data?.results ?? [], (result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <h1 className="text-3xl font-bold mb-4">Trending</h1>
      <ButtonGroup
        value={interval}
        onClick={(value: string) => {
          setSearchParams({ interval: value });
        }}
        options={[
          { label: 'Day', value: 'day' },
          { label: 'Week', value: 'week' },
        ]}
      />
      <ImageGrid results={gridData} getHref={(id) => `/movie/${id}`} />
    </section>
  );
};