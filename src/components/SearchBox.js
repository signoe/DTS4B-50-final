import { Box, Grid, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchMovie = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!search) return;

        navigate(`/search/${search}`);
        setSearch('');
    };

    return (
        <div>
            <Grid  sx={{bgcolor: '#424242'}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 5,
                    pt: 7
                }}>
                    <Paper
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 900 }}
                    >
                        <InputBase fullWidth
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search for a movie, tv show..."
                            inputProps={{ 'aria-label': 'search movie' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Box>
            </Grid>
        </div>   
    );
}

export default SearchMovie;