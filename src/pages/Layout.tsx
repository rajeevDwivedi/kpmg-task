import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import LeftSide from '../components/LeftSide';
import SearchInput from '../components/SearchInput';
import { Button, Paper } from '@mui/material';
import logo from '../assets/logo.png';
import regenerate from '../assets/regenerate.png';

const Layout = () => {
  const [open, setOpen] = React.useState<boolean>(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
 <Box sx={{ display: 'flex' }}>
      <LeftSide open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 2, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mt:3}}>
            <img src={logo} alt="Logo" style={{ width: 40, height: 40, 
              background: 'radial-gradient(140% 57.5% at 52.5% 50%, #459AFF 0%, #6054FF 100%)', borderRadius: '50%', cursor: 'pointer' }}
              onClick={open ? handleDrawerClose : handleDrawerOpen}
            />
      <Paper
        elevation={0}
        sx={{
          ml:3,
          display: 'flex',
          width: '100%',
          maxWidth: 1214,
          height: 730,
          overflowY: 'auto',
        }}
      >
        <Box  p={3}>
          <Typography variant='h4' sx={{ marginBottom: 2 }}>What is weather today in Singapore ?</Typography>
      
        <Typography sx={{ marginBottom: 2 }}>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.</Typography>
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