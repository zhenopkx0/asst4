import { Outlet } from "react-router-dom";
import { GenreSubheader } from "../../components/GenreSubheader";

export const GenreView = () => {
  return (
    <div>
      <GenreSubheader />
      <Outlet />
    </div>
  );
};