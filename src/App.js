import './App.css';
import { ThemeProvider } from '@mui/material';

import Navbar from './components/Navbar';
import theme from './themes/theme';
import { Link, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/system';
import SearchResults from './containers/SearchResults';
import Home from './containers/Home';
import Footer from './components/Footer';
import MovieDetail from './components/MovieDetail';
import TvShowDetail from './components/TvShowDetail';
import DiscoverMovie from './containers/Discover';
import Login from './containers/Login';
import Register from './containers/Register';
import Favourite from './containers/Favourite';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="discover" element={
            <ProtectedRoute>
              <DiscoverMovie/>
            </ProtectedRoute>} />
          <Route path="favourite" element={
            <ProtectedRoute>
              <Favourite/>
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
        </Routes>
        <Footer></Footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
