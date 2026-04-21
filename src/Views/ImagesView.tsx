import { ImageGrid } from "../components/ImageGrid";
import { mapToGridData } from "../mapToGridData.ts/mapToGridData";
import { useTmdb } from "../Hooks/useTmdb";
import { useParams } from "react-router-dom";

type ImageResponse = {
  id: number;
  profiles: Array<{
    file_path: string | null;
    vote_count: number;
  }>;
};

const PERSON_ENDPOINT = "https://api.themoviedb.org/3/person";

export const ImagesView = () => {
  const { id } = useParams();

  const { data } = useTmdb<ImageResponse>(
    `${PERSON_ENDPOINT}/${id}/images`,
    {},
    [id]
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const gridData = mapToGridData(data.profiles ?? [], (result) => ({
    id: data.id,
    imagePath: result.file_path,
    primaryText: `Vote Count: ${result.vote_count}`,
  }));

  return (
    <div>
      <ImageGrid results={gridData} />
    </div>
  );
};
