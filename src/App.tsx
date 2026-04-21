import { MainLayout } from "./Layouts/MainLayout";
import { ErrorView } from "./Views/ErrorView";
import { HomeView } from "./Views/HomeView";
import { CreditsView } from "./Views/CreditsView";
import { MovieView } from "./Views/MovieView";
import { NowPlayingView } from "./Views/NowPlayingView";
import { ReviewsView } from "./Views/ReviewsView";
import { TrendingMovieView } from "./Views/TrendingMovieView";
import { SearchView } from "./Views/Search/SearchPeopleView";
import { Route, Routes } from "react-router-dom";
import { PopularView } from "./Views/PopularView";
import { TopRatedView } from "./Views/TopRatedView";
import { UpcomingView } from "./Views/UpcomingView";
import { MoviesView } from "./Views/MoviesView";
import { TrendingTVView } from "./Views/TrendingTVView";
import { TrendingView } from "./Views/TrendingView";
import { TVView } from "./Views/TV/TVView";
import { AiringTodayView } from "./Views/TV/AiringTodayView";
import { OnTheAirView } from "./Views/TV/OnTheAirView";
import { PopularTVView } from "./Views/TV/PopularTVView";
import { TopRatedTVView } from "./Views/TV/TopRatedTVView";
import { GenreView } from "./Views/Genre/GenreView";
import { TrailerView } from "./Views/TrailerView";
import { ViewTV } from "./Views/tvStuff/ViewTV";
import { SeasonsView } from "./Views/tvStuff/SeaonsView";
import { EpisodesView } from "./Views/tvStuff/EpisodesView";
import { PersonView } from "./Views/PersonView";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/movies" element={<MoviesView />}>
          <Route path="now-playing" element={<NowPlayingView />} />
          <Route path="popular" element={<PopularView />} />
          <Route path="top-rated" element={<TopRatedView />} />
          <Route path="upcoming" element={<UpcomingView />} />
        </Route>
        <Route path="/search" element={<SearchView />} />
        <Route path="/person/:id" element={<PersonView />} />
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
        <Route path="/trending" element={<TrendingView />}>
          <Route path="movie" element={<TrendingMovieView />} />
          <Route path="tv" element={<TrendingTVView />} />
        </Route>
        <Route path="/tv" element={<TVView />}>
          <Route path="airing-today" element={<AiringTodayView />} />
          <Route path="on-the-air" element={<OnTheAirView />} />
          <Route path="popular" element={<PopularTVView />} />
          <Route path="top-rated" element={<TopRatedTVView />} />
        </Route>
        <Route path="/genre/:media/:genre" element={<GenreView />}>
          {/*idk man*/}
        </Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
