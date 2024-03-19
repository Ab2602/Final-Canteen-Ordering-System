
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext } from "../../theme";
import { Link, useLocation } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import {UserOutlined} from '@ant-design/icons';

import useRequireAuth from "../useRequireAuth";
 
const Topbar = () => {

  useRequireAuth("/");

  const [showUserDetails, setShowUserDetails] = useState(false);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState({
    username: 'Demo',
    role: 'ADMIN',
    location: 'BIA',
    phone: '8765364857'
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, []);


  const handleMouseEnter = () => {
    setShowUserDetails(true);
};

const handleMouseLeave = () => {
    setShowUserDetails(false);
};

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
 
  return (
    <Box position="absolute" top={0} right={0} p={2}>
      {/* ICONS */}
      <Box display="flex" gap="10px" alignItems="center">
      
                    <Link to="/admin/profile">
                    <div onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                     <UserOutlined style={{fontSize: '20px', color: 'black'}}/>
                     {showUserDetails && (
                            <div style={{
                              width: '180px',
                              backgroundColor: '#edf2f7',
                              position: 'absolute',
                              zIndex: '10',
                              right: '2.5rem',
                              top: '4rem',
                              padding: '1rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                              borderRadius: '0.5rem',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <div style={{ fontSize: '48px' }}>
                                <UserOutlined />
                              </div>
                              <div>
                                <p style={{ color: '#4a5568' }}>Username: {userProfile.username}</p>
                                <p style={{ color: '#4a5568' }}>Role: {userProfile.role}</p>
                                <p style={{ color: '#4a5568' }}>Location: {userProfile.location}</p>
                                <p style={{ color: '#4a5568' }}>Phone: {userProfile.phone}</p>
                              </div>
                            </div>
                        )}
                    </div>
                    </Link>
                    
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
 
export default Topbar;
 