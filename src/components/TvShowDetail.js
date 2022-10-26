import {  Box, Card, CardMedia, Divider, Grid, List, ListItem, ListItemText, Rating, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncTvShowDetail, getSelectedTvShow } from '../reducers/movieSlice';

const BASE_IMAGE_URL = "http://image.tmdb.org/t/p/original";

const TvShowDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getSelectedTvShow);

    console.log(Object.keys(data));

    useEffect(() => {
        dispatch(fetchAsyncTvShowDetail(id));
    }, [dispatch, id]);

    return (
        <div>
            {Object.keys(data).length === 0 ? (
            <div>...Loading</div>
            ) : (
            <Grid container  sx={{ mt:7, p:5, pl:10, pr:10, width:'100%', bgcolor:'#424242' }}>
                <Grid >
                <Box sx={{minWidth:300}}>
                    <Card id="">
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
                            <Typography variant="h3" sx={{ mb:1 }}>{data.name} </Typography>
                            <Typography variant="body1">
                                {`${new Date(data.first_air_date).getFullYear()} - ${data.status}`}
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
                                    >Episode Runtime: {` ${data.episode_run_time}`}
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
                    </List>
                </Grid>
            </Grid>
            )}
        </div>
    );
}

export default TvShowDetail;