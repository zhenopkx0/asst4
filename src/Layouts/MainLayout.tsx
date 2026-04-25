import { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header query={query} setQuery={setQuery} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
