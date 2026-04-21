import { useTmdb } from "../Hooks/useTmdb";
import { Outlet, useParams } from "react-router-dom";
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { LinkGroup } from "../components/LinkGroup";

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
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClose={() => navigate(-1)}>
      <section className="min-h-screen bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-6">{data.name}</h2>
        <p className="text-gray-400 mt-2">Birthday: {data.birthday}</p>
        <p className="text-gray-400 mt-2">
          Place of Birth: {data.place_of_birth}
        </p>
        <p className="text-gray-400 mt-2">
          Known For: {data.known_for_department}
        </p>

        <img
          src={`https://image.tmdb.org/t/p/w300${data.profile_path}`}
          alt={data.name}
          className="rounded mb-4"
        />

        <p className="text-gray-300">{data.biography}</p>
        <p className="text-gray-400 mt-4">Popularity: {data.popularity}</p>
      </section>
      <LinkGroup
        options={[
          { label: "Career", to: "career" },
          { label: "Images", to: "images" },
        ]}
      />
      <Outlet />
    </Modal>
  );
};
