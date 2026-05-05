import { useTmdb } from "../../Hooks/useTmdb";
import { Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LinkGroup } from "../../components/LinkGroup";
import { Button } from "../../components/Button";

type PersonResponse = {
  id: number;
  name: string;
  profile_path: string | null;
  birthday: string;
  biography: string;
  place_of_birth: string;
  known_for_department: string;
  popularity: number;
};

const PERSON_ENDPOINT = "https://api.themoviedb.org/3/person";

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useTmdb<PersonResponse>(`${PERSON_ENDPOINT}/${id}`, {}, [
    id,
  ]);

  if (!data) {
    return (
      <p className="text-center text-gray-400 text-lg mt-10 animate-pulse">
        Loading...
      </p>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-4 py-12">
      <Button onClick={() => navigate(-1)}>← Back</Button>
      <div className="max-w-4xl mx-auto my-10 bg-gray-900 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gray-800 p-8 md:p-12 space-y-10">
        {/* Name */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          {data.name}
        </h2>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <img
            src={`https://image.tmdb.org/t/p/w300${data.profile_path}`}
            alt={data.name}
            className="rounded-xl w-56 md:w-64 object-cover shadow-xl border border-gray-800"
          />

          {/* Info Box (THIS is what adds structure) */}
          <div className="flex-1 bg-gray-800/40 rounded-xl p-6 space-y-5 border border-gray-700">
            <p>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Birthday
              </span>
              <br />
              <span className="text-lg text-white">{data.birthday}</span>
            </p>

            <p>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Place of Birth
              </span>
              <br />
              <span className="text-lg text-white">{data.place_of_birth}</span>
            </p>

            <p>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Known For
              </span>
              <br />
              <span className="text-lg text-white">
                {data.known_for_department}
              </span>
            </p>

            <p>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Popularity
              </span>
              <br />
              <span className="text-lg text-white">{data.popularity}</span>
            </p>
          </div>
        </div>

        {/* Biography */}
        <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Biography</h3>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base max-h-80 overflow-y-auto pr-2">
            {data.biography}
          </p>
        </div>

        {/* Links */}
        <div className="pt-4 border-t border-gray-800">
          <LinkGroup
            options={[
              { label: "Career", to: "career" },
              { label: "Images", to: "images" },
            ]}
          />
        </div>

        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
