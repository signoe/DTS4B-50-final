import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import MovieCard from '../components/MovieCard';
import { getFavouriteMovies } from '../reducers/movieSlice';

const Favourite = () => {
    const [user] = useAuthState(auth);
    const favourite = useSelector(getFavouriteMovies);

    console.log(favourite);

    return (
        <div>
            <Grid  sx={{bgcolor: '#424242'}}>
                <Box sx={{
                    display: 'block',
                    alignItems: 'center',
                    
                    justifyContent: 'center',
                    p: 5,
                    pt: 12,
                }}>
                    <Typography variant='body2' sx={{ color:'white'}}>wellcome, {user.email} </Typography>
                    <Typography variant='h4' sx={{ color:'white'}}> Favourite Movies</Typography>
                </Box>
            </Grid>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                p: 5
            }}>
                {favourite && favourite.map((movie) => (
                    <MovieCard movie={movie} />
                ))}
            </Box>
        </div>
    );
}

export default Favourite;