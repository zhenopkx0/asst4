import { ImageGrid } from "../../components/ImageGrid";
import { mapToGridData } from "../../mapToGridData.ts/mapToGridData";
import { useTmdb } from "../../Hooks/useTmdb";
import { useParams } from "react-router-dom";

type EpisdoesResponse = {
  episodes: Array<{
    id: number;
    name: string;
    still_path: string | null;
    episode_number: number;
  }>;
};

const EPISODE_ENDPOINT = "https://api.themoviedb.org/3/tv";

export const EpisodesView = () => {
  const { id, season_number } = useParams();

  const { data } = useTmdb<EpisdoesResponse>(
    `${EPISODE_ENDPOINT}/${id}/season/${season_number}`,
    {},
    [id, season_number]
  );

  const gridData = mapToGridData(data?.episodes ?? [], (result) => ({
    id: result.episode_number,
    imagePath: result.still_path,
    primaryText: result.name,
    secondaryText: result.episode_number
      ? `Episode ${result.episode_number}`
      : undefined,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-6">Episodes</h2>
      {!data.episodes.length && (
        <p className="text-gray-400 text-center">No episodes available.</p>
      )}
      <ImageGrid results={gridData} />
    </section>
  );
};
