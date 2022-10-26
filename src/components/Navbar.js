import GroupWorkIcon from '@mui/icons-material/GroupWork';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../config/firebase';
import { Button, Stack } from '@mui/material';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            <GroupWorkIcon sx={{ display: 'flex', mr: 1 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: 'block',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
              }}
            >
              <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/">
                MOVIEDA
              </Link>
            </Typography>
            <Box sx={{ display: 'flex',  }}>
                {user?.email ? (
                  <Stack spacing={1} direction="row">
                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/discover">
                      <Button variant="text" color="inherit">Discover</Button>
                    </Link>
                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/favourite">
                      <Button variant="text" color="inherit">Favourite</Button>
                    </Link>
                    <Button variant="outlined" color="inherit" onClick={onLogout}>Logout</Button>
                  </Stack>
                ) : (
                  <Stack spacing={1} direction="row">
                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/login">
                      <Button variant="text" color="inherit">Login</Button>
                    </Link>
                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/register">
                      <Button variant="outlined" color="inherit">Register</Button>
                    </Link>
                  </Stack>
                )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
}

export default Navbar;
