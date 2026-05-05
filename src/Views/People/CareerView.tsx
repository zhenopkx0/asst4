import { ImageGrid } from "../../components/ImageGrid";
import { mapToGridData } from "../../mapToGridData.ts/mapToGridData";
import { useTmdb } from "../../Hooks/useTmdb";
import { useParams } from "react-router-dom";

type CareerResponse = {
  cast: Array<{
    id: number;
    original_title: string;
    poster_path: string | null;
    character: string;
  }>;
};

const PERSON_ENDPOINT = "https://api.themoviedb.org/3/person";

export const CareerView = () => {
  const { id } = useParams();

  const { data } = useTmdb<CareerResponse>(
    `${PERSON_ENDPOINT}/${id}/movie_credits`,
    {},
    [id]
  );

  const gridData = mapToGridData(data?.cast ?? [], (result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <section className="min-h-screen bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-6">Career</h2>
        {!data.cast.length && (
          <p className="text-gray-400 text-center">No career available.</p>
        )}
        <ImageGrid results={gridData} getHref={(id) => `/movie/${id}`} />
      </section>
    </div>
  );
};
