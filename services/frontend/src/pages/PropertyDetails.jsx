import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { MapPin, Wifi, Wind, Coffee, Lock, Key, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/property/details/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!property) return <div className="text-center mt-20 text-gray-400">Loading sanctuary...</div>;

  const handleBooking = async () => {
     if (!token) return navigate('/login');
     try {
       await api.post('/booking/create', { property: id, startDate: new Date(), endDate: new Date(), totalPrice: property.price || 0 });
       alert("Booking Request Sent to owner pending confirmation!");
       navigate('/bookings/my');
     } catch (err) {
       alert(err.response?.data?.message || err.message);
     }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10">
      
      {/* Header Overview */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-midnight-neon mb-2">Elite Collection &middot; {property.propertyType}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{property.title}</h1>
          <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
             <span className="flex items-center gap-1 text-yellow-500">★ 4.98 <span className="text-gray-500">(124 reviews)</span></span>
             <span>&middot;</span>
             <span className="flex items-center gap-1"><MapPin size={14}/> {property.location}</span>
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="btn-secondary h-12">Share</button>
          <button className="btn-secondary border-midnight-neon/50 text-midnight-neon hover:bg-midnight-neon hover:text-white h-12">Save</button>
        </div>
      </div>

      {/* Hero Imaging */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[400px] md:h-[600px] overflow-hidden rounded-[2rem]">
        <div className="col-span-1 border border-white/5 md:col-span-8 bg-midnight-800 h-full w-full rounded-[2rem] overflow-hidden relative group">
           <img src={`https://source.unsplash.com/random/1200x800/?interior,purple,${id}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
        </div>
        <div className="hidden md:flex flex-col gap-4 col-span-4 h-full">
            <div className="flex-1 bg-midnight-800 rounded-[2rem] border border-white/5 overflow-hidden"><img src={`https://source.unsplash.com/random/600x400/?bed,bedroom,night`} className="w-full h-full object-cover"/></div>
            <div className="flex-1 bg-midnight-800 rounded-[2rem] border border-white/5 overflow-hidden"><img src={`https://source.unsplash.com/random/600x400/?city,skyline,dark`} className="w-full h-full object-cover"/></div>
        </div>
      </div>

      {/* Content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4 relative">
        <div className="lg:col-span-8 flex flex-col gap-10">
           
           <div>
             <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">Designed for the Cosmopolitan Dreamer</h2>
             <p className="text-gray-300 leading-relaxed max-w-3xl">
               Perched in the heart of {property.location}, {property.title} offers an unparalleled nocturnal experience. Bathed in ambient violet hues and furnished with bespoke velvet pieces, it's more than a room—it's a private sanctuary amidst the city lights.
             </p>
           </div>
           
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-4 flex flex-col gap-2">
                <Coffee size={20} className="text-orange-400"/>
                <p className="font-bold text-sm">Curated Mini-Bar</p>
                <p className="text-xs text-gray-500">Premium selection</p>
              </div>
              <div className="glass rounded-xl p-4 flex flex-col gap-2">
                <Wifi size={20} className="text-blue-400"/>
                <p className="font-bold text-sm">Gigabit WIFI</p>
                <p className="text-xs text-gray-500">Ultra-fast fiber</p>
              </div>
              <div className="glass rounded-xl p-4 flex flex-col gap-2">
                <Lock size={20} className="text-green-400"/>
                <p className="font-bold text-sm">Private</p>
                <p className="text-xs text-gray-500">Entire space</p>
              </div>
              <div className="glass rounded-xl p-4 flex flex-col gap-2">
                <Wind size={20} className="text-teal-400"/>
                <p className="font-bold text-sm">Climate</p>
                <p className="text-xs text-gray-500">Intelligent HVAC</p>
              </div>
           </div>

           <div className="border border-white/10 rounded-[2rem] bg-midnight-800 p-8 h-[300px] flex items-center justify-center text-gray-500">
              <p>Map Location Implementation</p>
           </div>

        </div>

        {/* Sticky Booking Widget */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 glass-card p-6 flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
               <div>
                  <h3 className="text-3xl font-extrabold text-white">${property.price || 450}</h3>
                  <p className="text-gray-400 text-sm">/ night</p>
               </div>
               <div className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                 {property.isAvailable ? 'Available' : 'Unavailable'}
               </div>
            </div>

            <div className="border border-white/10 rounded-2xl overflow-hidden flex flex-col text-sm">
               <div className="flex border-b border-white/10">
                  <div className="flex-1 p-3 border-r border-white/10">
                     <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Check-in</p>
                     <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="flex-1 p-3">
                     <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Check-out</p>
                     <p className="font-semibold">Select dates</p>
                  </div>
               </div>
               <div className="p-3 bg-midnight-900/40">
                  <p className="text-[10px] uppercase font-bold text-gray-500 mb-1">Guests</p>
                  <p className="font-semibold">2 Adults</p>
               </div>
            </div>

            <button onClick={handleBooking} className="btn-primary py-4 w-full shadow-midnight-neon/20 hover:shadow-midnight-neon/40 text-lg">
              Confirm Booking
            </button>
            <p className="text-center text-xs text-gray-400">You won't be charged yet</p>

            <div className="flex justify-between border-t border-white/10 pt-4 mt-2">
               <p className="font-bold text-white">Total</p>
               <p className="font-bold text-white">${property.price || 450}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
