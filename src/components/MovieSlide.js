import React from 'react';
import Slider from "react-slick";
import { Box,  Grid, Typography} from '@mui/material';
import MovieCard from './MovieCard';
import { useSelector } from 'react-redux';
import { getAllMovies, getAllTvShows } from '../reducers/movieSlice';
import TvShowCard from './TvShowCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const MovieSlide = () => {
    const movies = useSelector(getAllMovies);
    const tvShows = useSelector(getAllTvShows);
    console.log(movies);
    console.log(tvShows);
  
    const settings = {
      centerMode: true,
      infinite: true,
      focusOnSelect: true,
      centerPadding: "60px",
      slidesToScroll: 5,
      speed: 1000, 
      initialSlide: 0,
      variableWidth: true,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 3000,
    };
    return (
      <div>
        <div>
          <Typography variant='h5' 
            sx={{
              flexGrow: 1,
              display: 'block',
              letterSpacing: '.1rem', color:'#0d47a1', p: 2, pl: 5
            }}>
          <TrendingUpIcon /> Trending Movies
          </Typography>
          <Grid  sx={{bgcolor: '#424242'}}>
          <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              mr: 5,
              ml: 5,
              p: 5
          }}>
          <Slider {...settings}>
              {
                movies.map((movie) => {
                  return <MovieCard movie={movie}></MovieCard>
                })
              }
          </Slider>
          </Box>
          </Grid>
        </div>
        <div>
          <Typography variant='h5' component="div"
              sx={{
                flexGrow: 1,
                display: 'block',
                letterSpacing: '.1rem', color:'#0d47a1', p: 2, pl: 5
              }}>
          <TrendingUpIcon /> Trending Tv Shows
          </Typography>
          <Grid  sx={{bgcolor: '#424242'}}>
          <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              mr: 5,
              ml: 5,
              p: 5
          }}>
          <Slider {...settings}>
              {
                tvShows.map((movie) => {
                  return <TvShowCard movie={movie}></TvShowCard>
                })
              }
          </Slider>
          </Box>
          </Grid>
        </div>
      </div>
    );
}

export default MovieSlide;