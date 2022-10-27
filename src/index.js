import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Link, Route, RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './app/store';
import MovieDetail from './components/MovieDetail';
import TvShowDetail from './components/TvShowDetail';
import DiscoverMovie from './containers/Discover';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import Favourite from './containers/Favourite';
import ProtectedRoute from './components/ProtectedRoute';
import SearchResults from './containers/SearchResults';
import { Box } from '@mui/material';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<Home />} />
      <Route path="discover" element={
        <ProtectedRoute>
          <DiscoverMovie />
        </ProtectedRoute>} />
      <Route path="favourite" element={
        <ProtectedRoute>
          <Favourite />
        </ProtectedRoute>} />
      <Route path="movie/:id" element={<MovieDetail/>} />
      <Route path="tvShow/:id" element={<TvShowDetail/>} />
      <Route path="search/:search" element={<SearchResults />} />
      <Route path="login" element={
        <ProtectedRoute loginOnly={false}>
          <Login />
        </ProtectedRoute>} />
      <Route path="register" element={
        <ProtectedRoute loginOnly={false}>
          <Register />
        </ProtectedRoute>} />
      <Route
        path="*"
        element={
          <Box sx={{
            display: 'flex', 
            margin: 10, 
            justifyContent: 'center',
            alignItems: 'center', 
            flexDirection: 'column',
           }}>
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/404-error-4461124-3696774.png"
              alt="404"
            />
            <p>You have reach the edge of universe</p>
            <Link to="/">Take me home!</Link>
          </Box>
        }
      />
  </Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
