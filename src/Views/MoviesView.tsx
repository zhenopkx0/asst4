import { Outlet } from "react-router-dom";
import { Subheader } from "../components/Subheader";

export const MoviesView = () => {
  return (
    <div>
      <Subheader />
      <Outlet />
    </div>
  );
};