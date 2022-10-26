import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MovieSlide from '../components/MovieSlide';
import SearchMovie from '../components/SearchBox';
import { fetchAsyncMovies, fetchAsyncTvShows } from '../reducers/movieSlice';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsyncMovies());
        dispatch(fetchAsyncTvShows());
    }, [dispatch]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 5
        }}>
            <SearchMovie />
            <MovieSlide />
        </Box>
        
    );
}

export default Home;