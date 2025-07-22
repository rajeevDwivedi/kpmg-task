import { useEffect, useState } from 'react';
import { Box, TextField, IconButton, Paper, Typography, CircularProgress, Button } from '@mui/material';
import mind from '../assets/mind.png';
import send from '../assets/send.png';
import regenerate from '../assets/regenerate.png';
import type { DrawerProps } from '../types/drawer';
import useStore from '../store';

const SearchInput = (props: DrawerProps) => {
  const { open } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // const apiUrl = process.env.REACT_APP_SEARCH_API;
  // const apiKey = process.env.REACT_APP_SEARCH_API_KEY;
  const apiUrl = 'https://test-stream-python.onrender.com/stream';
  const apiKey = '19290737-c14d-4757-90f1-f5ed89014fa4';

  const submitChat = useStore((state) => state.submitChat)

  const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchTerm(e.target.value)
    setError(false);
  }

  const submitSearch = async () => {
    if (searchTerm.trim() === '') {
      setError(true)
      return;
    } else {
      setError(false)
    }
    setIsSubmit(true);
    const id = Date.now();
    submitChat({
      id,
      created: id,
      choices: [{ delta: { content: searchTerm, role: 'user' } }],
    });
    const requestOptions = {
      method: "GET",
      headers: {
        'x-api-key': apiKey,
      },
    };

    fetch(`${apiUrl}?promptssss=${encodeURIComponent(searchTerm)}`, requestOptions)
      .then(response => {
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
                setIsSubmit(false);
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
                setIsSubmit(false);
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
    if (searchTerm.length > 0) {
      setIsTyping(true);

      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 1000);

      return () => clearTimeout(typingTimeout);
    } else {
      setIsTyping(false);
    }
  }, [searchTerm]);

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          textTransform: 'none',
          border: '1px solid rgba(81, 161, 255, 1)',
          width: 218,
          height: 54,
          color: 'rgba(81, 161, 255, 1)',
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          left: open ? 0 : { xs: 0, sm: 58, md: -200 },
        }}
        size="medium"
        href="#text-buttons"
        startIcon={
          <img src={regenerate} alt="Regenerate Icon" style={{ width: 14, height: 14 }} />
        }
        onClick={submitSearch}
      >
        Regenerate Response
      </Button>
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 11, sm: 20, md: 30 },
          left: open ? 0 : { xs: 0, sm: 108, md: -467 },
          right: 0,
          px: 2,
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
            marginLeft: { xs: 8, sm: 0, md: '42%', lg: 50, xl: 30 },
          }}
        >


          {isTyping && (
            <Typography variant="body2" sx={{ mb: 1, color: 'gray' }}>
              Typing...
            </Typography>
          )}
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
            onChange={(e) => changeInput(e)}
            value={searchTerm}
            error={error}
            helperText={error ? 'This field is required' : ''}
          />
          <IconButton
            sx={{
              height: 48,
              width: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            disabled={isSubmit}
            onClick={submitSearch}
          >
            {isSubmit ?
              <CircularProgress />
              :
              <img src={send} alt="Send Icon" style={{ width: 48, height: 48 }} />
            }
          </IconButton>
        </Paper>
      </Box></>
  )
}

export default SearchInput