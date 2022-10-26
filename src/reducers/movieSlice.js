import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const URL_KEY = axios.create({
  baseURL: `${process.env.REACT_APP_URL_KEY}`,
});
const API_KEY = process.env.REACT_APP_API_KEY;

const initialState = {
    movies: [],
    tvShows: [],
    selectedMovie: [],
    selectedTvShow: [],
    searchMovie: [],
    searchTvShow: [],
    favourite: []
  };

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchMovies",
  async () => {
    const filter = "trending/movie/week";
    const response = await URL_KEY.get(`${filter}?api_key=${API_KEY}`);
    return response.data.results;
  }
);

export const fetchAsyncTvShows = createAsyncThunk(
  "tvShows/fetchTvShows",
  async () => {
    const filter = "trending/tv/week";
    const response = await URL_KEY.get(`${filter}?api_key=${API_KEY}`);
    return response.data.results;
  }
);

export const fetchAsyncMovieSearch = createAsyncThunk(
  "movie/search",
  async (search) => {
    const query = `query=${search}`;
    const filter = "search/movie";
    const response = await URL_KEY.get(`${filter}?api_key=${API_KEY}&${query}`);
    return response.data.results;
  }
);

export const fetchAsyncTvShowSearch = createAsyncThunk(
  "tvShow/search",
  async (search) => {
    const query = `query=${search}`;
    const filter = "search/tv";
    const response = await URL_KEY.get(`${filter}?api_key=${API_KEY}&${query}`);
    return response.data.results;
  }
);

export const fetchAsyncMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id) => {
    const detailId = `movie/${id}`;
    const response = await URL_KEY.get(`${detailId}?api_key=${API_KEY}`);
    return response.data;
  }
);

export const fetchAsyncTvShowDetail = createAsyncThunk(
  "tvShow/fetchTvShowDetail",
  async (id) => {
    const detailId = `tv/${id}`;
    const response = await URL_KEY.get(`${detailId}?api_key=${API_KEY}`);
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovie: (state) => {
      state.selectedMovie = {};
    },
    removeSelectedTvShow: (state) => {
      state.selectedTvShow = {};
    },
    addMovies: (state, action) => {
      state.movies = action.payload
    },
    addFavourite: (state, action) => {
      state.favourite.push({...action.payload});
    },
    removeFavourite: (state, action) => {
      const removeFavourite = state.favourite.filter((movie) => movie.id !== action.payload);
      state.favourite = removeFavourite;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Fetched Succesfully");
        return { ...state, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("Rejected");
      })
      .addCase(fetchAsyncTvShows.fulfilled, (state, { payload }) => {
        console.log("Fetched Succesfully");
        return { ...state, tvShows: payload };
      })
      .addCase(fetchAsyncTvShows.rejected, () => {
        console.log("Rejected");
      })
      .addCase(fetchAsyncMovieSearch.fulfilled, (state, { payload }) => {
        console.log("Fetched Succesfully");
        return { ...state, searchMovie: payload };
      })
      .addCase(fetchAsyncMovieSearch.rejected, () => {
        console.log("Rejected");
      })
      .addCase(fetchAsyncTvShowSearch.fulfilled, (state, { payload }) => {
        console.log("Fetched Succesfully");
        return { ...state, searchTvShow: payload };
      })
      .addCase(fetchAsyncTvShowSearch.rejected, () => {
        console.log("Rejected");
      })
      .addCase(fetchAsyncMovieDetail.fulfilled, (state, { payload }) => {
        console.log("Fetched Succesfully");
        return { ...state, selectedMovie: payload };
      })
      .addCase(fetchAsyncTvShowDetail.fulfilled, (state, { payload }) => {
          console.log("Fetched Succesfully");
          return { ...state, selectedTvShow: payload };
      })
  }
});

export const { removeSelectedMovie, removeSelectedTvShow, addMovies, addFavourite, removeFavourite } = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;
export const getAllTvShows = (state) => state.movies.tvShows;
export const getSelectedMovie = (state) => state.movies.selectedMovie;
export const getSelectedTvShow = (state) => state.movies.selectedTvShow;
export const getSearchedMovies = (state) => state.movies.searchMovie;
export const getSeacrhedTvShows = (state) => state.movies.searchTvShow;
export const getFavouriteMovies = (state) => state.movies.favourite;

export default movieSlice.reducer;