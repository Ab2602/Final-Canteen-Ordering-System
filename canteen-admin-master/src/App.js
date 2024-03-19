
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Order_Information from "./scenes/order_information";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import Add_Item from "./scenes/add_item";
import AddItem from "./scenes/add_item";
import Inventory from "./scenes/inventory";
import Logout from "./scenes/logout";
import LoginPage from "./scenes/Login";
import UserProfile from "./scenes/profile/userprofile";
 
function App() {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);  
  const location = useLocation();

  // const [isSidebar, setIsSidebar] = useState(location.pathname !== "/");

  const [isSidebar, setIsSidebar] = useState(checkSidebarVisibility(location.pathname));

  function checkSidebarVisibility(pathname) {
    const visiblePaths = [
      "/admin/dashboard",
      "/admin/order-info",
      "/admin/add-item",
      "/admin/item-info",
      "/admin/profile",
    ];
    return visiblePaths.includes(pathname);
  }
 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        {isSidebar && <Sidebar />}
          <main className="content">
            {isSidebar && <Topbar />}
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/order-info" element={<Order_Information />} />
              <Route path="/admin/add-item" element={<AddItem />} />
              <Route path="/admin/item-info" element={<Inventory />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/admin/profile" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
 
export default App;
 