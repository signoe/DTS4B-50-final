import { Box,  Typography } from '@mui/material';
import React from 'react'

const Footer = () => {
  return (
    <div>
        <Box component="nav"
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 5,
            bgcolor: '#424242',
            color: 'white'
        }}>
            <Typography variant='caption'>
                Movieda | Movie Database App -
            </Typography>
            <></>
            <Typography variant='caption'>
                - with React By Signoe
            </Typography>
        </Box>
        
    </div>   
  );
}

export default Footer;