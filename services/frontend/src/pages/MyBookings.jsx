import React, { useEffect, useState } from 'react';
import api from '../services/api';

const MyBookings = () => {
   const [bookings, setBookings] = useState([]);

   useEffect(() => {
     const run = async () => {
       try {
         const res = await api.get('/booking/my');
         setBookings(res.data);
       } catch (err) {
         console.error(err);
       }
     }
     run();
   }, []);

   return (
      <div className="w-full">
         <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
         <div className="flex flex-col gap-4">
             {bookings.length === 0 ? (
                <div className="glass-card p-10 text-center text-gray-400">
                   You have no upcoming stays.
                </div>
             ) : bookings.map(b => (
                 <div key={b._id} className="glass border border-white/5 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-bold">{b.property?.title}</p>
                      <p className="text-xs text-gray-400">Total: ${b.totalPrice}</p>
                    </div>
                    <div className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                        b.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' :
                        b.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-500' :
                         'bg-red-500/20 text-red-500'
                    }`}>
                        {b.status}
                    </div>
                 </div>
             ))}
         </div>
      </div>
   );
};

export default MyBookings;
