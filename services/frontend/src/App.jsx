import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Properties from './pages/Properties';
import Search from './pages/Search';
import OwnerDashboard from './pages/owner/Dashboard';
import PropertyDetails from './pages/PropertyDetails';
import MyBookings from './pages/MyBookings';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex center text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="search" element={<Search />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:id" element={<PropertyDetails />} />
        
        {/* Authenticated Routes */}
        <Route path="bookings/my" element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        } />
        
        {/* Owner Routes */}
        <Route path="owner/*">
          <Route path="dashboard" element={
            <ProtectedRoute allowedRoles={['owner', 'admin']}>
              <OwnerDashboard />
            </ProtectedRoute>
          } />
        </Route>
        
      </Route>
    </Routes>
  )
}

export default App;
