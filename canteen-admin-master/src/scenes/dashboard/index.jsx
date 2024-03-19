

import useRequireAuth from "../useRequireAuth";
 
const Dashboard = () => {
  useRequireAuth("/");
  return (
    <>
      <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', objectFit: "cover", overflow: 'hidden', height: '100vh' }}>
        <img src="../../PIA.jpg" alt="dash" />
      </div>
    </>
  );
};
 
export default Dashboard;
 