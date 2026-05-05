import { API_KEY, MOVIE_ENDPOINT, TV_ENDPOINT } from "../../core/Constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

type TrailerResponse = {
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

export const TrailerView = () => {
  const { pathname } = useLocation();
  const ENDPOINT = pathname.includes("movie") ? MOVIE_ENDPOINT : TV_ENDPOINT;
  const { id } = useParams();
  const [movie, setMovie] = useState<TrailerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const getMovie = async () => {
      try {
        setLoading(true);

        const response = await axios.get<TrailerResponse>(`${ENDPOINT}/${id}`, {
          params: { api_key: API_KEY, append_to_response: "videos" },
          signal: controller.signal,
        });

        const trailerVideo =
          response.data.videos?.results.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Trailer" &&
              video.name?.toLowerCase().includes("official")
          ) ||
          response.data.videos?.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
          );

        if (trailerVideo) {
          setTrailer(trailerVideo.key);
        }
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie detail:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovie();

    return () => controller.abort();
  }, [id]);

  if (loading || !movie) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-10">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col flex-row gap-8">
        <div className="space-y-4">
          {trailer && (
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Movie Trailer"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
      <section className="max-w-[1200px] mx-auto">
        <Outlet />
      </section>
    </section>
  );
};
