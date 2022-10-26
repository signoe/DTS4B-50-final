import {  Box, Button, Card, CardMedia, Divider, Grid, List, ListItem, ListItemText, Rating, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, fetchAsyncMovieDetail, getSelectedMovie, removeFavourite } from '../reducers/movieSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

const BASE_IMAGE_URL = "http://image.tmdb.org/t/p/original";

const MovieDetail = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getSelectedMovie);
    const { favourite } = useSelector((state) => state.movies);

    console.log(Object.keys(data));

    useEffect(() => {
        dispatch(fetchAsyncMovieDetail(id));
    }, [dispatch, id]);

    const handleAddFavourite = (e) => {
        e.preventDefault();

        dispatch(
            favourite?.find((m) => m.id === data.id)
                ? removeFavourite(data.id)
                : addFavourite(data)
        )
    }

    return (
        <div>
            {Object.keys(data).length === 0 ? (
            <div>...Loading</div>
            ) : (
            <Grid container  sx={{ mt:7, p:5, pl:10, pr:10, width:'100%', bgcolor:'#424242' }}>
                <Grid >
                <Box sx={{minWidth:300}}>
                    <Card id={data.id}>
                        <CardMedia
                            component="img"
                            sx={{ width: 300, height: 450 }}
                            image={`${BASE_IMAGE_URL}${data.poster_path}`}
                            alt="Movie poster"
                        >
                        </CardMedia>
                    </Card>
                </Box>
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                    <List sx={{ width: 'auto',  bgcolor: '#424242', color: 'white', p: 4, pt:2 }}>
                            <Typography variant="h3" sx={{ mb:1 }}>{data.title} </Typography>
                            <Typography variant="body1">
                                {`${new Date(data.release_date).getFullYear()} - ${data.status}`}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating
                                    name="text-feedback"
                                    value="4"
                                    max={1}
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <Typography variant="h6" sx={{ ml: 1 }}>{data.vote_average.toFixed(1)}</Typography>
                                <Typography variant="body2">/10</Typography>
                            </Box>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                primary={data.overview}
                                />
                            </ListItem>
                            <Divider component="li" />
                            <ListItem alignItems="flex-start">
                                <ListItemText sx={{color:'white'}}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        color="whitesmoke"
                                    >Genres: {` ${data.genres.map(({ name }) => name).join()}`}
                                    </Typography>
                                    </React.Fragment>
                                }/>
                            </ListItem>
                            <Divider component="li" />
                            <ListItem alignItems="flex-start">
                            <ListItemText
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        color="whitesmoke"
                                    >Runtime: {` ${Math.floor(data.runtime / 60)}hr ${data.runtime % 60}m`}
                                    </Typography>
                                    </React.Fragment>
                                }/>
                            </ListItem>
                            <Divider component="li" />
                            <ListItem alignItems="flex-start">
                            <ListItemText
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        color="whitesmoke"
                                    >Country: {` ${data.production_countries.map(({ name }) => name).join()}`}
                                    </Typography>
                                    </React.Fragment>
                                }/>
                            </ListItem>
                            <Divider component="li" />
                            {user?.email ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, pl: 2 }} >
                                <Button 
                                    variant="contained" 
                                    onClick={handleAddFavourite}
                                    color={(favourite?.find((m) => m.id === data.id) ? `error` : `success`)}
                                    >
                                    {favourite?.find((m) => m.id === data.id) ? `Remove From Favourite` : `Add To Favourite`}
                                
                                </Button>
                            </Box>
                            ) : []}
                    </List>
                </Grid>
            </Grid>
            )}
        </div>
    );
}

export default MovieDetail;