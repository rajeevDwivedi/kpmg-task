import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import LeftSide from '../components/LeftSide';
import SearchInput from '../components/SearchInput';
import { Button, ListItemIcon, Paper } from '@mui/material';
import AssistantIcon from '@mui/icons-material/SmartToy'; // Example icon
import UserIcon from '@mui/icons-material/Person';
import logo from '../assets/logo.png';
import regenerate from '../assets/regenerate.png';
import useStore from '../store';

const Layout = () => {
  const [open, setOpen] = React.useState<boolean>(true);
  const chats = useStore((state) => state.chats);
  const [chatsList, setChatsList] = React.useState<Props>(chats);
  // Log the initial state of chats

  React.useEffect(() => {
    // const chatsData = useStore.getState().chats;
    setChatsList(chats);
    console.log('Initial chats:', chatsList);
  }, [chats, chatsList]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  interface Chat {
    created: number;
    choices: Array<{
      delta: {
        role?: string;
        content?: string;
      };
    }>;
  }

  interface Props {
    chatsList: Chat[];
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <LeftSide open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 2, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 3, width: '100%' }}>
          <img src={logo} alt="Logo" style={{
            width: 40, height: 40,
            background: 'radial-gradient(140% 57.5% at 52.5% 50%, #459AFF 0%, #6054FF 100%)', borderRadius: '50%', cursor: 'pointer'
          }}
            onClick={open ? handleDrawerClose : handleDrawerOpen}
          />
          <Paper
            elevation={0}
            sx={{
              ml: 3,
              display: 'flex',
              width: '1214px',
              maxWidth: 1214,
              height: 730,
              overflowY: 'auto',
            }}
          >

            <Box p={3} sx={{ width: '100%' }}>
              {chatsList.map((chatObj) => {
                const role = chatObj.role || 'user';
                const isAssistant = role === 'assistant';

                return (<Box
                  key={chatObj.id}
                  sx={{
                    display: 'flex',
                    justifyContent: isAssistant ? 'flex-end' : 'flex-start',
                    mb: 2,
                    width: '100%'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      p: 2,
                      backgroundColor: isAssistant ? '#e3f2fd' : '#f1f1f1',
                      borderRadius: isAssistant ? '0 8px 8px 8px' : '8px 0 8px 8px',
                      // maxWidth: '100%',
                      width: '100%'
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        // minWidth: 0,
                        mr: 1.5,
                        color: isAssistant ? 'primary.main' : 'text.secondary',
                      }}
                    >
                      {isAssistant ? <AssistantIcon /> : <UserIcon />}
                    </ListItemIcon>
                    <Box>
                      <Typography variant="h6" sx={{ textTransform: 'capitalize', mb: 0.5 }}>
                        {role}
                      </Typography>
                      {
                        chatObj.data.map(chat => {
                          // const choice = chat.choices[0];
                          const delta = chat.choices[0]?.delta || {};

                          return (
                            <React.Fragment key={chat.created}>
                              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                {delta.content}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                Created at: {new Date(chat.created * 1000).toLocaleString()}
                              </Typography>
                            </React.Fragment>
                          );
                        })
                      }
                    </Box>
                  </Box>
                </Box>
                );
              })}
            </Box>

          </Paper>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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
            }}
            size="medium"
            href="#text-buttons"
            startIcon={
              <img src={regenerate} alt="Regenerate Icon" style={{ width: 14, height: 14 }} />
            }
          >
            Regenerate Response
          </Button>
        </Box>
        <SearchInput open={open} />
      </Box>
    </Box>
  )
}

export default Layout