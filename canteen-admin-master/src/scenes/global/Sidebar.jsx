
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import useRequireAuth from "../useRequireAuth";

import { Tooltip } from 'antd';

 
const Item = ({ title, to, icon, selected, setSelected }) => {

  useRequireAuth("/");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const textColor = theme.palette.mode === "dark" ? colors.grey[100] : "#FFFFFF";
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: textColor,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
 
const Sidebar = () => {

  useRequireAuth("/");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
 
  return (
    <Box
      sx={{
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: "#630944",
          overflow: "hidden",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: theme.palette.mode === "dark" ? colors.blueAccent[500] : colors.greenAccent[500],
        },
        "& .pro-menu-item.active": {
          color: theme.palette.mode === "dark" ? colors.blueAccent[500] : colors.greenAccent[500],
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuIcon /> : undefined}
            style={{
              margin: "10px 0 30px 0",
              color: "white", // Changed color to white
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color="white"> {/* Changed color to white */}
                  ADMIN PORTAL
                </Typography>
                
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuIcon style={{ color: "white" }} /> {/* Changed color to white */}
                </IconButton>
              </Box>
            )}
          </MenuItem>
 
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="90px"
                  src={`../../secure_logo.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center" mt="10px">
                <Typography variant="h5" color={theme.palette.mode === "dark" ? colors.blueAccent[500] : colors.greenAccent[500]}>
                  Admin Name
                </Typography>
              </Box>
            </Box>
          )}
 
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
 
            <Typography
              variant="h6"
              color="light-blue"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            
            <Item
              title="Item Master"
              to="/admin/item-info"
              icon={<FastfoodIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Order Information"
              to="/admin/order-info"
              icon={<BorderColorIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
            <Typography
              variant="h6"
              color="light-blue"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
           
            <Item
              title="Add Item"
              to="/admin/add-item"
              icon={<AddBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
            <Item
              title="Profile"
              to="/admin/profile"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
 
export default Sidebar;
 