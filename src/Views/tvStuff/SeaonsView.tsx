import { ImageGrid } from "../../components/ImageGrid";
import { mapToGridData } from "../../mapToGridData.ts/mapToGridData";
import { useTmdb } from "../../Hooks/useTmdb";
import { useParams } from "react-router-dom";

type SeasonsResponse = {
  seasons: Array<{
    id: number;
    name: string;
    poster_path: string | null;
    season_number: number;
  }>;
};

const TV_ENDPOINT = "https://api.themoviedb.org/3/tv";

export const SeasonsView = () => {
  const { id } = useParams();

  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);

  const gridData = mapToGridData(data?.seasons ?? [], (result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.name,
    secondaryText: result.season_number
      ? `Season ${result.season_number}`
      : undefined,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Seasons</h2>
      {!data.seasons.length && (
        <p className="text-gray-400 text-center">No seasons available.</p>
      )}
      <ImageGrid
        results={gridData}
        getHref={(season_number) => `/tv/${id}/season/${season_number}`}
      />
    </section>
  );
};
