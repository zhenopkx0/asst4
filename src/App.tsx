import { MainLayout } from "./Layouts/MainLayout";
import { ErrorView } from "./views/ErrorView";
import { HomeView } from "./views/HomeView";
import { CreditsView } from "./views/CreditsView";
import { MovieView } from "./views/MovieView";
import { ReviewsView } from "./views/ReviewsView";
import { Route, Routes } from "react-router-dom";
import { MoviesView } from "./views/MoviesView";
import { TrendingView } from "./views/TrendingView";
import { GenreView } from "./views/Genre/GenreView";
import { TrailerView } from "./views/TrailerView";
import { ViewTV } from "./views/tvStuff/ViewTV";
import { SeasonsView } from "./views/tvStuff/SeaonsView";
import { EpisodesView } from "./views/tvStuff/EpisodesView";
import { PersonView } from "./views/PersonView";
import { CareerView } from "./views/CareerView";
import { ImagesView } from "./views/ImagesView";
import { SearchView } from "./views/Search/SearchView";
import { TelevisionView } from "./views/TV/TelevisionView";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/movies">
          <Route path="now-playing" element={<MoviesView />} />
          <Route path="popular" element={<MoviesView />} />
          <Route path="top-rated" element={<MoviesView />} />
          <Route path="upcoming" element={<MoviesView />} />
        </Route>
        {/*search stuff !!*/}
        <Route path="/search" element={<SearchView />} />
        {/* <Route path="/search/people" element={<SearchView />} />
        <Route path="/search/movies" element={<SearchMoviesView />} />
        <Route path="/search/tv" element={<SearchTvView />} /> */}
        {/*search stuff !!*/}
        <Route path="/person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>
        {/*person stuff !!*/}
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="trailer" element={<TrailerView />} />
        </Route>
        {/*tv stuff idk*/}
        <Route path="/tv/:id" element={<ViewTV />}>
          <Route path="seasons" element={<SeasonsView />} />
          <Route path="season/:season_number" element={<EpisodesView />} />
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="trailer" element={<TrailerView />} />
        </Route>
        <Route path="/trending">
          <Route path="movie" element={<TrendingView />} />
          <Route path="tv" element={<TrendingView />} />
        </Route>
        <Route path="/tv">
          <Route path="airing-today" element={<TelevisionView />} />
          <Route path="on-the-air" element={<TelevisionView />} />
          <Route path="popular" element={<TelevisionView />} />
          <Route path="top-rated" element={<TelevisionView />} />
        </Route>
        <Route path="/genre/:media/:genre" element={<GenreView />}>
          {/*idk man*/}
        </Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
