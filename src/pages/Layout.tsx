import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import LeftSide from '../components/LeftSide';
import SearchInput from '../components/SearchInput';
import { Paper, useMediaQuery, useTheme } from '@mui/material';
import logo from '../assets/logo.png';
import useStore from '../store';
import ChatList from '../components/Chat';
import type { Chat } from '../types/chat';

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const chats = useStore((state) => state.chats);

  const [open, setOpen] = useState<boolean>(true);
  const [chatsList, setChatsList] = useState<Chat[]>(chats);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    setChatsList(chats);
  }, [chats, chatsList]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatsList]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <LeftSide open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} isMobile={isMobile} />
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 2, md: 3 },
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            mt: 3,
            width: '100%',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <img src={logo} alt="Logo" style={{
            width: 40, height: 40,
            background: 'radial-gradient(140% 57.5% at 52.5% 50%, #459AFF 0%, #6054FF 100%)', borderRadius: '50%', cursor: 'pointer'
          }}
            onClick={open ? handleDrawerClose : handleDrawerOpen}
          />

          <Paper
            elevation={0}
            sx={{
              ml: { xs: 0, md: 3 },
              mt: { xs: 2, md: 0 },
              display: 'flex',
              width: '100%',
              maxWidth: { xs: '100%', md: 1214 },
              height: { xs: '60vh', md: 730 },
              overflowY: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none',
            }}
            ref={containerRef}
          >

            <Box p={3} sx={{ width: '100%' }}>
              {chatsList.map((chatObj) => {
                const role = chatObj.role || 'user';
                const isAssistant = role === 'assistant';

                return (
                  <ChatList key={chatObj.id} chatObj={chatObj} role={role} isAssistant={isAssistant} />
                );
              })}

              <div ref={bottomRef} />
            </Box>

          </Paper>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <SearchInput open={open} />
        </Box>
      </Box>
    </Box>
  )
}

export default Layout