import { useState, type ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ButtonGroup } from "./ButtonGroup";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get("type") ?? "movie";
  const [type, setType] = useState(searchType);

  return (
    <div>
      <span>
        <input
          type="search"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
            navigate(`/search?q=${e.target.value}&type=${type}`);
          }}
          placeholder="Search..."
          className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </span>
      <span>
        <ButtonGroup
          value={type}
          options={[
            { label: "Movies", value: "movie" },
            { label: "TV", value: "tv" },
            { label: "People", value: "person" },
          ]}
          onClick={(type) => {
            setType(type);
            navigate(`/search?q=${value}&type=${type}`);
          }}
        />
      </span>
    </div>
  );
};
