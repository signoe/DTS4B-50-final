import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";

import MovieCard from '../components/MovieCard';
import SearchMovie from '../components/SearchBox';

const URL_KEY = axios.create({
    baseURL: `${process.env.REACT_APP_URL_KEY}`,
});
const API_KEY = process.env.REACT_APP_API_KEY;

const DiscoverMovie = () => {
    const [queryParams, setQueryParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [moviesReady, setMoviesReady] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchedMovies = await URL_KEY.get(`discover/movie?api_key=${API_KEY}`);
                setMovies(fetchedMovies.data.results);
                setMoviesReady(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMovies();
    }, []);

    useEffect(() => {
        if (!moviesReady) return;
        const sortMovies = (type) => {
            if (type === 'asc') {
                const sorted = [...movies].sort((a, b) => a.vote_average - b.vote_average);
                setMovies(sorted);
            }
            if (type === 'desc') {
                const sorted = [...movies].sort((a, b) => b.vote_average - a.vote_average);
                setMovies(sorted);
            }
        }

        sortMovies(queryParams.get('sort'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams, moviesReady]);

    const setSortParam = (type) => {
        queryParams.set("sort", type);
        setQueryParams(queryParams);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 5
        }}>
            <SearchMovie/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mt: 5
            }}>
                Sort by Rating
                <Button
                    variant="contained"
                    sx={{ml: 2}}
                    onClick={() => setSortParam("asc")}
                >
                    Asc
                </Button>
                <Button
                    variant="contained"
                    sx={{ml: 2, mr: 2}}
                    onClick={() => setSortParam("desc")}
                >
                    Desc
                </Button>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                p: 5
            }}>
                {
                    movies.map(movie => (
                        <MovieCard movie={movie}></MovieCard>
                    ))
                }
            </Box>
        </Box>
    );
}

export default DiscoverMovie;