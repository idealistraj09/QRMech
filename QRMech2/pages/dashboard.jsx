// pages/dashboard.jsx

import PrivateRoute from '../components/PrivateRoute'; 

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1> 
      <p>Sensitive info here</p>
    </div>
  )
}

export default PrivateRoute(Dashboard);
