import React, { useEffect, useState } from "react";
import { upperCase } from "lodash";
import { LogoutOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import useRequireAuth from "../useRequireAuth";

const UserProfile = () => {

  useRequireAuth("/");

  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    // alert("you're are logged out!")
    localStorage.clear("token");
    window.location.href = "/";
  };

  const userData = {
    // image: "https://via.placeholder.com/150",
    image: "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png",
    username: "JohnDoe",
    phone: "123-456-7890",
    location: "New York",
    role: "Developer",
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("inside");
      try {
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage after login
        const response = await fetch("http://localhost:5000/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
  <div style={{ maxWidth: '20rem', padding: '2rem', backgroundColor: '#fff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', borderRadius: '0.5rem' }}>
    {userProfile ? (
      <>
        <div style={{ textAlign: 'center' }}>
          <img src={userData.image} alt="Profile" style={{ width: '8rem', height: '8rem', margin: '0 auto', borderRadius: '50%' }} />
          <h2 style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#4a5568' }}>{userProfile?.username}</h2>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#4a5568' }}>{upperCase(userProfile?.role)}</p>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: '#4a5568' }}>
            <span style={{ fontWeight: '600' }}>Phone:</span>
            <span>{userProfile?.phone}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.875rem', color: '#4a5568' }}>
            <span style={{ fontWeight: '600' }}>Location:</span>
            <span>{upperCase(userProfile?.location)}</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button onClick={handleLogout} style={{ color: 'red' }}>
            <LogoutOutlined /> Logout
          </button>
        </div>
      </>
    ) : (
      <Spin size="medium" />
    )}
  </div>
</div>


  );
};

export default UserProfile;
