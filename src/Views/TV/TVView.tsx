import { Outlet } from "react-router-dom";
import { TVSubheader } from "../../components/TVSubheader";

export const TVView = () => {
  return (
    <div>
      <TVSubheader />
      <Outlet />
    </div>
  );
};