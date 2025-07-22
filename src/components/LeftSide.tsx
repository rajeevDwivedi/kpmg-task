import React, { useState } from "react";
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
import { Avatar, Button, IconButton } from "@mui/material";
import logo from "../assets/logo.png";
import search from "../assets/search.png";
import message from "../assets/message.png";
import { useNavigate } from "react-router-dom";
import type { DrawerProps } from "../types/drawer";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useStore from '../store';

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
    width: `calc(${theme.spacing(8)} + 45px)`,
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

const newChat = () => {
  useStore.setState({ chats: [] });
}

const LeftSide = (props: DrawerProps) => {
  const { open } = props;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleListItemClick = (index: number) => {
    console.log("Clicked item index:", index);
    setActiveIndex(index);
  };
  const chatsList = useStore((state) => state.chats);
  const navigate = useNavigate();
  return (
    <Box sx={{ borderBottomRightRadius: 32, borderTopRightRadius: 32 }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            borderRight: 0, borderTopRightRadius: 32,
            borderBottomRightRadius: 32, backgroundColor: "#f5f5f5",
          },

        }}
      >
        <Box sx={{ borderTopRightRadius: 32, borderBottomRightRadius: 32, height: "100vh", backgroundColor: "#fff" }}>

          {open ? (
            <>
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

              <List sx={{ display: "flex", p: 0 }}>
                <ListItem disableGutters sx={{ p: 2, m: 0 }}>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none", width: 228, borderRadius: "30px", height: 50,
                      background: "linear-gradient(90deg, #459AFF 0%, #6054FF 100%)",
                    }}
                    size="medium"
                    onClick={newChat}
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
            </>
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
                  <Avatar sx={{ bgcolor: "#fff", mb: 4, mt: 3 }}>
                    <img
                      onClick={() => navigate("/")}
                      src={logo}
                      alt="Logo"
                      style={{
                        width: 40,
                        height: 40,
                        background:
                          "radial-gradient(140% 57.5% at 52.5% 50%, #459AFF 0%, #6054FF 100%)",
                        borderRadius: "40%",
                        cursor: "pointer",
                      }}
                    />
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
                    cursor: "pointer"
                  }}
                   onClick={newChat}
                >
                  <Avatar sx={{ background: "linear-gradient(90deg, #459AFF 0%, #6054FF 100%)" }}>
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
                  <Avatar sx={{ background: "linear-gradient(90deg, #459AFF 0%, #6054FF 100%)" }}>
                    <SearchIcon />
                  </Avatar>
                </ListItem>
              </List>
              <Divider sx={{ m: 2 }} />
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
                  <Avatar sx={{ background: "linear-gradient(90deg,rgb(157, 181, 214) 0%,rgba(112, 105, 241, 0.11) 100%)" }}>
                    <Typography sx={{ fontSize: 'small', fontWeight: 'bold' }}>AB</Typography>
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
                  <Avatar sx={{ background: "linear-gradient(90deg,rgb(157, 181, 214) 0%,rgba(112, 105, 241, 0.11) 100%)" }}>
                    <Typography sx={{ fontSize: 'small', fontWeight: 'bold' }}>AC</Typography>
                  </Avatar>
                </ListItem>
              </List>

            </>
          )}
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
                    onClick={newChat}
                  >
                    Clear All
                  </Button>
                </ListItem>
              </List>
              <Divider />

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
                {chatsList.filter(d => d.role === 'user')?.map((chats) => {
                  return chats?.data?.map(chat => {
                    const delta = chat.choices[0]?.delta;
                    return (<ListItem key={delta.content} disablePadding sx={{ display: "flex", backgroundColor: activeIndex === chat.id ? '#EBF4FF' : '', borderRadius: '30px', mb: 1, m: 1 }}>
                      <ListItemButton
                        onClick={() => handleListItemClick(chat.id)}
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
                                mr: 1,
                              }
                              : {
                                mr: "auto",
                              },
                          ]}
                        >
                          <img src={message} alt="message"  />
                         
                        </ListItemIcon>
                        <ListItemText
                          primary={delta.content
                            ? (delta.content.length > 40
                              ? delta.content.slice(0, 40) + "..."
                              : delta.content)
                            : ""}
                          primaryTypographyProps={{ variant: "caption" }}
                          title={delta.content}
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
                        {activeIndex === chat.id && (
                             <ListItem disableGutters sx={{ p: 1, m: 1, justifyContent: "end", backgroundColor: '#8B81FF', borderRadius: '30px', width: 'auto'}}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton edge="end" aria-label="edit" size="small" color="primary"  sx={{ color: "#FFFFFF", p: 0.5 }}>
                                  <EditIcon fontSize="small" sx={{ fontSize: 16 }} />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" size="small" color="error" sx={{ color: "#FFFFFF", p: 0.5 }}>
                                  <DeleteIcon fontSize="small" sx={{ fontSize: 16 }}/>
                                </IconButton>
                              </Box>
                              </ListItem>
                           )}
                    </ListItem>
                    )
                  })
                })}
              </List>
            </>
          )}
          {open ? (
            <>
              <List sx={{ display: "flex", p: 0, mt: 15 }}>
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
                    variant="outlined"
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
                    Developer
                    <Avatar sx={{ bgcolor: "#1976d2", width: 32, height: 32 }}>
                      <LogoutIcon sx={{ width: 15, height: 15 }} />
                    </Avatar>
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
                  pt: 62,
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
