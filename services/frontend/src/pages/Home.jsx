import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col gap-16 min-h-[85vh]">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden glass border-white/10 flex flex-col items-center justify-center min-h-[500px] text-center px-4 overflow-hidden">
        {/* Decorative ambient light */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-midnight-neon/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-midnight-purple/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="z-10 max-w-3xl flex flex-col items-center gap-6 mt-10">
          <p className="tracking-widest text-xs font-semibold text-gray-300 uppercase">Elevated Living</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Find your home <br/>
            <span className="bg-gradient-to-r from-orange-300 via-pink-400 to-midnight-neon bg-clip-text text-transparent">away from home.</span>
          </h1>
          <p className="text-gray-400 max-w-xl text-lg mt-4">
            Premium stays curated for students & tourists. Experience the art of living in the world's most vibrant neighborhoods.
          </p>

          {/* Search Bar Replica */}
          <div className="mt-8 glass-card p-2 w-full max-w-4xl flex flex-col md:flex-row items-center gap-2 rounded-full overflow-hidden">
            <div className="flex-1 w-full px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 text-left">
              <p className="text-xs text-gray-400 font-semibold tracking-wider">LOCATION</p>
              <input type="text" placeholder="Where to?" className="bg-transparent text-white focus:outline-none w-full mt-1" />
            </div>
            <div className="flex-1 w-full px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 text-left">
              <p className="text-xs text-gray-400 font-semibold tracking-wider">DATES</p>
              <input type="text" placeholder="Add dates" className="bg-transparent text-white focus:outline-none w-full mt-1" />
            </div>
            <div className="flex-1 w-full px-6 py-3 text-left">
              <p className="text-xs text-gray-400 font-semibold tracking-wider">GUESTS</p>
              <input type="text" placeholder="What's cooking?" className="bg-transparent text-white focus:outline-none w-full mt-1" />
            </div>
            <button className="btn-primary w-full md:w-auto h-full m-1 flex items-center justify-center gap-2 px-8 rounded-full">
              <Search size={18} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="flex flex-col items-center gap-10">
        <h2 className="text-3xl font-bold flex flex-col items-center">
          A Space for Everyone
          <span className="h-1 w-16 bg-midnight-neon mt-4 rounded-full" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="glass-card p-8 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-full bg-midnight-700 border border-white/10 flex items-center justify-center">
              <Search className="text-midnight-neon" size={20}/>
            </div>
            <h3 className="text-xl font-bold">The Explorer</h3>
            <p className="text-gray-400 text-sm flex-1">
              Short-term luxury stays in the heart of the city. Perfect for weekend getaways and cultural deep-dives.
            </p>
            <ul className="text-sm text-gray-300 space-y-2 mb-4">
              <li className="flex items-center gap-2"><span className="text-midnight-neon">✓</span> Flexible check-in</li>
              <li className="flex items-center gap-2"><span className="text-midnight-neon">✓</span> Verified premium hosts</li>
            </ul>
            <Link to="/search" className="text-sm font-semibold text-white hover:text-midnight-neon transition-colors">Explore destinations →</Link>
          </div>
          
          {/* Repeat similar cards for Student / Owner profiles */}
        </div>
      </section>
    </div>
  );
};
export default Home;
