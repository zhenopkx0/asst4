import { MainLayout } from './Layouts/MainLayout';
import { ErrorView } from './Views/ErrorView';
import { HomeView } from './Views/HomeView';
import { CreditsView } from './Views/CreditsView';
import { MovieView } from './Views/MovieView';
import { NowPlayingView } from './Views/NowPlayingView';
import { ReviewsView } from './Views/ReviewsView';
import { TrendingView } from './Views/TrendingView';
import { SearchView } from './Views/SearchView';
import { Route, Routes } from 'react-router-dom';
import { PopularView } from './Views/PopularView';
import { TopRatedView } from './Views/TopRatedView';
import { UpcomingView } from './Views/UpcomingView';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/now-playing" element={<NowPlayingView />} />
        <Route path="/popular" element={<PopularView />} />
        <Route path="/top-rated" element={<TopRatedView />} />
        <Route path="/upcoming" element={<UpcomingView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
        <Route path="/trending" element={<TrendingView />} />
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};