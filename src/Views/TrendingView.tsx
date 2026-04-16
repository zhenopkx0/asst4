import { Outlet } from "react-router-dom";
import { TrendingSubheader } from "../components/TrendingSubheader";

export const TrendingView = () => {
  return (
    <div>
      <TrendingSubheader />
      <Outlet />
    </div>
  );
};