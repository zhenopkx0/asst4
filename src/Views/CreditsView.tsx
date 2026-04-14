import { ImageGrid } from './../components/ImageGrid';
import { MOVIE_ENDPOINT } from './../core/Constants';
import { mapToGridData } from '../mapToGridData.ts/mapToGridData';
import { useTmdb } from './../Hooks/useTmdb';
import { useParams } from 'react-router-dom';

type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
  }>;
};

export const CreditsView = () => {
  const { id } = useParams();
  const { data } = useTmdb<CreditsResponse>(`${MOVIE_ENDPOINT}/${id}/credits`, {}, []);

  const gridData = mapToGridData(data?.cast ?? [], (result) => ({
    id: result.id,
    imagePath: result.profile_path,
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Credits</h2>
      {!data.cast.length && <p className="text-gray-400 text-center">No credits available.</p>}
      <ImageGrid results={gridData} />
    </section>
  );
};