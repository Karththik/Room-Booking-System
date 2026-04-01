import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Home, Bed, User, LayoutDashboard, CalendarClock, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalRooms: 0,
    totalBeds: 0,
    pendingBookings: 0,
    confirmedBookings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/property/owner/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard error", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="w-full flex">
      {/* Sidebar Placeholder */}
      <div className="w-64 min-h-[80vh] bg-midnight-800 border-r border-white/5 p-6 flex flex-col gap-6 rounded-3xl m-4 mt-0 ml-0 shadow-xl hidden lg:flex">
         <h2 className="text-xl font-bold flex items-center gap-2"><LayoutDashboard className="text-midnight-neon"/> Navigator</h2>
         <div className="flex flex-col gap-4 text-sm font-medium text-gray-400 mt-4">
             <button className="flex items-center gap-3 hover:text-white transition-colors text-white"><Home size={18}/> Overview</button>
             <button className="flex items-center gap-3 hover:text-white transition-colors"><ShieldCheck size={18}/> Properties</button>
             <button className="flex items-center gap-3 hover:text-white transition-colors"><CalendarClock size={18}/> Bookings</button>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name || "Owner"}!</h1>
          <p className="text-gray-400">Here's your property overview for today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 flex flex-col justify-between items-start cursor-pointer hover:bg-midnight-800/80">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
              <Home className="text-purple-400"/>
            </div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Properties</p>
            <h3 className="text-3xl font-extrabold text-white">{stats.totalProperties}</h3>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between items-start cursor-pointer hover:bg-midnight-800/80">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <Bed className="text-blue-400"/>
            </div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Rooms / Beds</p>
            <h3 className="text-3xl font-extrabold text-white">{stats.totalRooms} <span className="text-sm font-medium text-gray-500">/ {stats.totalBeds}</span></h3>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between items-start cursor-pointer hover:bg-midnight-800/80">
             <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
              <CalendarClock className="text-yellow-400"/>
            </div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Pending Requests</p>
            <h3 className="text-3xl font-extrabold text-white">{stats.pendingBookings}</h3>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between items-start cursor-pointer hover:bg-midnight-800/80">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <User className="text-green-400"/>
            </div>
            <p className="text-xs text-gray-400 uppercase font-semibold">Confirmed Guests</p>
            <h3 className="text-3xl font-extrabold text-white">{stats.confirmedBookings}</h3>
          </div>
        </div>

        <div className="mt-8">
           <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
             <h2 className="text-xl font-bold">Recent Pending Requests</h2>
             <button className="btn-secondary py-2 px-4 text-xs shadow-none">View All</button>
           </div>
           
           <div className="glass-card overflow-hidden">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-midnight-900 border-b border-white/5 uppercase text-xs font-semibold tracking-wider text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Guest</th>
                    <th className="px-6 py-4">Property</th>
                    <th className="px-6 py-4">Dates</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                   <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                     <td className="px-6 py-4">No pending bookings presently.</td>
                     <td className="px-6 py-4">-</td>
                     <td className="px-6 py-4">-</td>
                     <td className="px-6 py-4 text-right">-</td>
                   </tr>
                </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
