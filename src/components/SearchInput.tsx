import { useEffect, useState } from 'react';
import { Box, TextField, IconButton, Paper } from '@mui/material';
import mind from '../assets/mind.png';
import send from '../assets/send.png';
import type { DrawerProps } from '../types/drawer';
import useStore from '../store';

const SearchInput = (props: DrawerProps) => {
  const { open } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [chatData, setChatData] = useState([]);
  // const apiUrl = process.env.REACT_APP_SEARCH_API;
  // const apiKey = process.env.REACT_APP_SEARCH_API_KEY;
  const apiUrl = 'https://test-stream-python.onrender.com/stream';
  const apiKey = '19290737-c14d-4757-90f1-f5ed89014fa4';
  const chats = useStore((state) => state.chats)
  const submitChat = useStore((state) => state.submitChat)
  const submitSearch = async () => {

    const requestOptions = {
      method: "GET",
      headers: {
        'x-api-key': apiKey,
      },
      // redirect: "follow"
    };

    fetch(`${apiUrl}?prompt=${encodeURIComponent(searchTerm)}`, requestOptions)
      .then(response => {
        const id = Date.now();
        submitChat({
          id,
          choices: [{delta: {content: searchTerm, role: 'user'}}],
        });
        const stream = response.body;
        const reader = stream?.getReader();
        const readChunk = () => {
          reader?.read()
            .then(({
              value,
              done
            }) => {
              if (done) {
                console.log('Stream finished');
                return;
              }
              try {
                const chunkString = new TextDecoder().decode(value, { stream: true });
                const lines = chunkString.split('\n');
                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    const chunkObject = JSON.parse(line.substring(6).trim());
                    chunkObject.choices[0].delta.role = 'assistant';
                    submitChat(chunkObject);
                  }
                }
              }

              catch (error) {
                console.error('Error decoding chunk:', error);
              }
              readChunk();
            })
            .catch(error => {
              console.error(error);
            });
        };
        readChunk();
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    console.log('Chat data updated:', chatData);
  }, [chatData]);

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