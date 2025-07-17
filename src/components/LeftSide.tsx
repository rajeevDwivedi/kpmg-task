import { styled, type Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Button } from "@mui/material";
import logo from "../assets/logo.png";
import search from "../assets/search.png";
import message from "../assets/message.png";
import { useNavigate } from "react-router-dom";
import type { DrawerProps } from "../types/drawer";

const drawerWidth = 348;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));


const LeftSide = (props: DrawerProps) => {
  const { open } = props;
  const navigate = useNavigate();
  return (
    <Box sx={{borderBottomRightRadius: 32, borderTopRightRadius: 32}}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": { borderRight: 0, borderTopRightRadius: 32,
        borderBottomRightRadius: 32,backgroundColor: "#f5f5f5", },
        
        }}
      >
        <Box sx={{borderTopRightRadius: 32, borderBottomRightRadius: 32, height: "100vh", backgroundColor: "#fff"}}>
        <List sx={{ display: "flex", p: 2 }}>
          <ListItem>
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Logo"
          style={{
            width: 40,
            height: 40,
            background:
          "radial-gradient(140% 57.5% at 52.5% 50%, #459AFF 0%, #6054FF 100%)",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
        <Typography ml={2} sx={{ letterSpacing: "0.1em", lineHeight: 2 }}>
          L O R E M
        </Typography>
          </ListItem>
        </List>
        {open ? (
          <List sx={{ display: "flex", p: 0 }}>
        <ListItem disableGutters sx={{ p: 2, m: 0 }}>
          <Button
            variant="contained"
            sx={{ textTransform: "none", width: 228, borderRadius: "30px", height: 50, 
            background: "linear-gradient(90deg, #459AFF 0%, #6054FF 100%)", }}
            size="medium"
          >
            {" "}
            <AddIcon /> New Chat
          </Button>
        </ListItem>
        <ListItem disableGutters sx={{ p: 0, m: 0 }}>
            <img
          src={search}
          alt="Search Icon"
          style={{ width: 50, height: 50, marginRight: 8 }}
            />
        </ListItem>
          </List>
        ) : (
          <>
        <List sx={{ display: "flex", p: 0 }}>
          <ListItem
            disableGutters
            sx={{
          p: 1,
          m: 0,
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "#1976d2" }}>
          <AddIcon />
            </Avatar>
          </ListItem>
        </List>
        <List sx={{ display: "flex", p: 0 }}>
          <ListItem
            disableGutters
            sx={{
          p: 1,
          m: 0,
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "#1976d2" }}>
          <SearchIcon />
            </Avatar>
          </ListItem>
        </List>
          </>
        )}
        <Divider />
        {open && (
          <>
        <List sx={{ display: "flex", justifyContent: 'space-between', p: 0 }}>
          <ListItem disableGutters sx={{ p: 2, m: 0 }}>
            <Typography variant="caption" component="div">
          Your conversations
            </Typography>
          </ListItem>
          <ListItem disableGutters sx={{ p: 1, m: 1, justifyContent: "end" }}>
            <Button
          sx={{ textTransform: "none" }}
          size="small"
          href="#text-buttons"
            >
          Clear All
            </Button>
          </ListItem>
        </List>
        <Divider />
          </>
        )}
        <List>
          {[
        "Create html game evnironment",
        "Lorem lipsum Project",
        "Lorem Project",
          ].map((text) => (
        <ListItem key={text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={[
          {
            minHeight: 48,
            px: 2.5,
          },
          open
            ? {
            justifyContent: "initial",
              }
            : {
            justifyContent: "center",
              },
            ]}
          >
            <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: "center",
            },
            open
              ? {
              mr: 3,
            }
              : {
              mr: "auto",
            },
          ]}
            >
              <img src={message} alt="message" />
            </ListItemIcon>
            <ListItemText
          primary={text.length > 40 ? text.slice(0, 40) + "..." : text}
          primaryTypographyProps={{ variant: "caption" }}
          title={text}
          sx={[
            open
              ? {
              opacity: 1,
            }
              : {
              opacity: 0,
            },
          ]}
            />
          </ListItemButton>
        </ListItem>
          ))}
        </List>
        <Divider />
        <List sx={{ display: "flex", p: 0 }}>
          <ListItem disableGutters sx={{ p: 2, m: 0 }}>
        <Typography variant="caption" component="div">
          {" "}
          Last 7 Days
        </Typography>
          </ListItem>
        </List>
        <Divider />

        <List>
          {[
        "Crypto Lending App",
        "Operator Grammer Types",
        "Min States For Binary DFA",
        "Lorem POS system",
          ].map((text) => (
        <ListItem key={text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={[
          {
            minHeight: 48,
            px: 2.5,
          },
          open
            ? {
            justifyContent: "initial",
              }
            : {
            justifyContent: "center",
              },
            ]}
          >
            <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: "center",
            },
            open
              ? {
              mr: 3,
            }
              : {
              mr: "auto",
            },
          ]}
            >
           <img src={message} alt="message" />
            </ListItemIcon>
            <ListItemText
          primary={text.length > 40 ? text.slice(0, 40) + "..." : text}
          primaryTypographyProps={{ variant: "caption" }}
          title={text}
          sx={[
            open
              ? {
              opacity: 1,
            }
              : {
              opacity: 0,
            },
          ]}
            />
          </ListItemButton>
        </ListItem>
          ))}
        </List>
        {open ? (
          <>
        <List sx={{ display: "flex", p: 0, mt: 20 }}>
          <ListItem disableGutters sx={{ p: 2, m: 0 }}>
            <Button
          fullWidth
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
          }}
          size="medium"
            >
          <Avatar sx={{ bgcolor: "#1976d2", width: 32, height: 32 }}>
            <SettingsIcon sx={{ width: 25, height: 25 }} />
          </Avatar>
          Setting
            </Button>
          </ListItem>
        </List>
        <List sx={{ display: "flex", p: 0 }}>
          <ListItem disableGutters sx={{ p: 2, m: 0 }}>
            <Button
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          size="medium"
            >
          Developer <LogoutIcon />
            </Button>
          </ListItem>
        </List>
          </>
        ) : (
          <List sx={{ display: "flex", p: 0 }}>
        <ListItem
          disableGutters
          sx={{
            p: 1,
            m: 0,
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "#1976d2" }}>
            <SettingsIcon />
          </Avatar>
        </ListItem>
          </List>
        )}</Box>
      </Drawer>
    </Box>
  );
};

export default LeftSide;
