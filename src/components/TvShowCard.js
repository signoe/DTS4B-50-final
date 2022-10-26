import { Box, Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const BASE_IMAGE_URL = "http://image.tmdb.org/t/p/original";

const TvShowCard = ({movie}) => {
  return (
    <Card id={movie.id} sx={{ maxWidth: 200, margin: 1 }}>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/tvShow/${movie.id}`}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{ width: 200, height: 300 }}
          image={`${BASE_IMAGE_URL}${movie.poster_path}`}
          alt="Movie poster"
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: 100 }}>
          <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
            <Typography gutterBottom variant="h6" >
              <Rating name="read-only" precision={0.1} value={movie.vote_average / 2} max={1} size="small" readOnly />
              {movie.vote_average.toFixed(1)}
            </Typography>
            <Typography color="text.secondary">/10</Typography>
          </Box>
          <Typography component="div">
            {movie.name} ({new Date(movie.first_air_date).getFullYear()})
          </Typography>
        </CardContent>
        <Box/>
      </CardActionArea>
      </Link>
    </Card>
  );
}

export default TvShowCard;