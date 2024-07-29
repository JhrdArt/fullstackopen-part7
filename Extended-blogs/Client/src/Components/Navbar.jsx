import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';
import { useState } from 'react';


//material
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";


export const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutUser())
    };

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar color='transparent' position='static'>
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                        <IconButton size='large' aria-label='curren user' aria-controls='menu-appbar' aria-haspopup="true" onClick={handleOpenNavMenu} color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <Menu id='menu-appbar' anchorEl={anchorElNav} anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }} keepMounted transformOrigin={{ vertical: "bottom", horizontal: "left" }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: "block", md: "block" } }}>
                            <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            <MenuItem component={Link} to="/blogs" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Blogs</Typography>
                            </MenuItem>
                            <MenuItem component={Link} to="/users" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Users</Typography>
                            </MenuItem>

                        </Menu>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open Settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar />
                            </IconButton>
                        </Tooltip>
                        <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: "top", horizontal: "right" }} keepMounted transformOrigin={{
                            vertical: "top", horizontal: "right"
                        }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" onClick={handleLogout} >Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
