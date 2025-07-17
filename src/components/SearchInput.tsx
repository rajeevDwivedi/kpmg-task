import {useState} from 'react';
import { Box, TextField, IconButton, Paper } from '@mui/material';
import mind from '../assets/mind.png'; 
import send from '../assets/send.png';
import type { DrawerProps } from '../types/drawer';

const SearchInput = (props: DrawerProps) => {
  const { open } = props;
    const [searchTerm, setSearchTerm] = useState('');
    // const apiUrl = process.env.REACT_APP_SEARCH_API;
    // const apiKey = process.env.REACT_APP_SEARCH_API_KEY;
    const apiUrl = 'https://test-stream-python.onrender.com/stream';
    const apiKey = '19290737-c14d-4757-90f1-f5ed89014fa4';
    const submitSearch = () => {   
        fetch(`${apiUrl}?prompt=${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',  
                'x-api-key': apiKey, 
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Search results:', data);
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
        console.log(`Searching for: ${searchTerm}`, apiKey, apiUrl  );
     }

  return (
      <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        left: open ? 0 : '-32%',
        right: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center', 
          width: '100%',
          maxWidth: 1214,
          borderRadius: '20px',
          marginLeft: 30,
        }}
      >
        <TextField
          placeholder="What in your mind?..."
          variant="standard"
          fullWidth
          InputProps={{
        disableUnderline: true,
        startAdornment: (
          <img src={mind} alt="Search Icon" style={{ width: 23, height: 34, marginRight: 18 }} />
        ),
        sx: { lineHeight: 'normal', height: 40, alignItems: 'center' }, 
          }}
          sx={{
        '& .MuiInputBase-input': {
          lineHeight: 'normal',
          height: 40,
          display: 'flex',
          alignItems: 'center',
        },
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <IconButton
          sx={{
        height: 48,
        width: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
          }}
          onClick={submitSearch}
        >
          <img src={send} alt="Send Icon" style={{ width: 48, height: 48 }} />
        </IconButton>
      </Paper>
    </Box>
  )
}

export default SearchInput