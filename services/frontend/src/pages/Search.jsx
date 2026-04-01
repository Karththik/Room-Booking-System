import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

const Search = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Demo fetch
    const fetchApi = async () => {
      try {
        const res = await api.get('/property/search');
        setProperties(res.data);
      } catch {
         // Fallback local memory for visual demo
         setProperties([
           { _id: '1', title: 'Obsidian Penthouse', location: 'Downtown District', price: 820, rating: 4.8 },
           { _id: '2', title: 'Shadow Loft', location: 'Brooklyn Heights', price: 380, rating: 4.5 },
           { _id: '3', title: 'Eclipse Cabin', location: 'Upstate Retreat', price: 290, rating: 4.9 }
         ]);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-4">
        <div>
           <p className="text-xs font-semibold tracking-widest text-midnight-neon uppercase mb-2">Handpicked for you</p>
           <h2 className="text-4xl font-bold text-white">Featured Listings</h2>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:border-midnight-neon transition-colors">←</button>
          <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:border-midnight-neon transition-colors">→</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(p => (
           <Link to={`/properties/${p._id}`} key={p._id} className="group relative rounded-[2rem] overflow-hidden bg-midnight-800 border border-white/5 hover:border-midnight-purple/50 transition-all duration-300 transform hover:-translate-y-2">
             <div className="h-64 bg-midnight-900 w-full relative">
                <div className="absolute top-4 left-4 bg-midnight-neon text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">Available</div>
                {/* Fallback image */}
                <div className="w-full h-full bg-gradient-to-b from-transparent to-midnight-900 opacity-60 absolute bottom-0 z-10"/>
                <img src={`https://source.unsplash.com/random/800x600/?interior,dark,${p._id}`} className="w-full h-full object-cover" alt="interior"/>
             </div>
             
             <div className="p-6 relative z-20 flex justify-between items-end mt-[-20px] bg-midnight-800/90 backdrop-blur-md pb-6 rounded-b-[2rem]">
               <div className="flex flex-col gap-1">
                 <h3 className="font-bold text-lg text-white group-hover:text-midnight-neon transition-colors">{p.title}</h3>
                 <p className="text-sm text-gray-400 flex items-center gap-1"><MapPin size={12}/>{p.location}</p>
               </div>
               <div className="flex flex-col items-end gap-1">
                  <p className="flex items-center gap-1 text-sm font-semibold text-yellow-500"><Star size={12} fill="currentColor"/> {p.rating || 'New'}</p>
                  <p className="font-bold text-white text-lg">${p.price} <span className="text-xs font-normal text-gray-400">/ night</span></p>
               </div>
             </div>
           </Link>
        ))}
      </div>
    </div>
  );
};
export default Search;
