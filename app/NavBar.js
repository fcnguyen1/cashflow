"use client";
import { React, useState } from "react";
import CustomModal from "./prop_components/CustomModal";
import TermsModal from "./TermsModal";

import "tailwindcss/tailwind.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import HouseIcon from "@mui/icons-material/House";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [openCustom, setOpenCustom] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);

  const handleOpenCustom = () => setOpenCustom(true);
  const handleCloseCustom = () => setOpenCustom(false);
  const handleOpenTerms = () => setOpenTerms(true);
  const handleCloseTerms = () => setOpenTerms(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      className="bg-gradient-to-r from-slate-500 to-cyan-900"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <HouseIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FlowWise
          </Typography>

          <HouseIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FlowWise
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className="flex justify-end"
          >
            <Button
              onClick={handleOpenCustom}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Custom
            </Button>
            {openCustom ? (
              <CustomModal
                openModal={handleOpenCustom}
                closeModal={handleCloseCustom}
                currentState={openCustom}
              ></CustomModal>
            ) : (
              <></>
            )}
            <Button
              onClick={handleOpenTerms}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Terms
            </Button>
            {openTerms ? (
              <TermsModal
                openModal={handleOpenTerms}
                closeModal={handleCloseTerms}
                currentState={openTerms}
              ></TermsModal>
            ) : (
              <></>
            )}
            <Button
              href="https://github.com/fcnguyen1"
              target="_blank"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Github
            </Button>
            <Button
              // href="https://github.com/fcnguyen1"
              target="_blank"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About Me
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
