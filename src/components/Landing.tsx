import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LogoH.png";

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={2}>
        <Grid  size={{ xs: 12, md: 7, sm: 12, lg:5 }} offset={{ xs: 0, md: 1, sm: 0, lg: 7 }}>
          <Box
            mt={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: 100,
                  color:
                    "radial-gradient(140% 57.5% at 52.5% 50%, #459AFF 0%, #6054FF 100%)",
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box ml={4}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "inter, sans-serif",
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.898)",
                }}
              >
                LOREM
              </Typography>
              <Typography variant="body1" sx={{ display: "inline" }}>
                Lorem is a dummy text
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              margin: "20px 0",
              color: "rgba(226, 232, 240, 1)",
              width: "255px",
              marginTop: "55px",
            }}
          />
          <Grid  size={{ xs: 12, md: 12, sm: 12, lg: 12 }}>
          <Box sx={{ p: 1 }}>
            <Typography
              variant="h3"
              sx={{ textAlign: "left", marginTop: "20px" }}
            >
              Lorem lpsum is simply
              <br /> dummy text,{" "}
              <Typography
                variant="h3"
                component="span"
                sx={{ color: "blue", display: "inline" }}
              >
                LOREM
              </Typography>
              .
            </Typography>
            <Typography
              variant="body2"
              align="justify"
              gutterBottom
              sx={{
                marginTop: "20px",
                ml: 1,
                textAlign: "left",
                fontSize: "13px",
              }}
            >
              Lorem lpsum is simply dummy text of the printing and typesetting
              industry.
              <br />
              Lorem Ipsum has been the industry's standard dummy text ever since
              the <br />
              1500s,
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left", ml: 1 }}>
            <Button
              sx={{ textTransform: "none", color: "rgba(139, 129, 255, 1)" }}
              size="small"
              href="#text-buttons"
            >
              Get started today!
            </Button>
          </Box>
          <Box sx={{ textAlign: "left", marginTop: "25px", ml: 1, mb:2 }}>
            <Button
              onClick={() => navigate("/chat")}
              variant="contained"
              sx={{
                textTransform: "none",
                mr: 2,
                height: 48,
                width: 200,
                background: "linear-gradient(90deg, #459AFF 0%, #6054FF 100%)",
              }}
              size="medium"
            >
              Get started
            </Button>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                border: "1px solid rgba(81, 161, 255, 1)",
                width: 138,
                height: 48,
                color: "rgba(81, 161, 255, 1)",
              }}
              size="medium"
              href="#text-buttons"
            >
              Learn More
            </Button>
          </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Landing;
