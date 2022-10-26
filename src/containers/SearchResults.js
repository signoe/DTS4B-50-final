import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SearchMovie from '../components/SearchBox';
import TvShowCard from '../components/TvShowCard';
import { fetchAsyncMovieSearch, fetchAsyncTvShowSearch, getSeacrhedTvShows, getSearchedMovies } from '../reducers/movieSlice';

const SearchResults = () => {
    const { search } = useParams();
    const dispatch = useDispatch();
    const movies = useSelector(getSearchedMovies);
    const tvShows = useSelector(getSeacrhedTvShows);

    console.log(movies);

    useEffect(() => {
        dispatch(fetchAsyncMovieSearch(search));
        dispatch(fetchAsyncTvShowSearch(search));
    }, [dispatch, search]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            mt: 5
        }}>
            <SearchMovie />
            <Typography variant='h6' sx={{ p:2, textAlign: 'center', color:'#0d47a1' }}> Results for: { search }</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                p: 5,
                bgcolor: '#424242'
            }}>
                {
                    movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie}></MovieCard>
                    ))
                }
                {
                    tvShows.map(movie => (
                        <TvShowCard key={movie.id} movie={movie}></TvShowCard>
                    ))
                }
            </Box>
        </Box>
    );
}

export default SearchResults;