'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { getRandomProfiles } from '../../lib/supabase';
import { Shuffle, Loader2 } from 'lucide-react';

// Theme configurations for preview
const themes = {
  sunset: { primary: '#ff6b6b', secondary: '#ffd93d', bg: '#fff5e6' },
  ocean: { primary: '#4ecdc4', secondary: '#1a535c', bg: '#e8f5f7' },
  forest: { primary: '#95e1d3', secondary: '#38ada9', bg: '#f0fff4' },
  lavender: { primary: '#a29bfe', secondary: '#6c5ce7', bg: '#f5f3ff' },
  peach: { primary: '#fab1a0', secondary: '#fd79a8', bg: '#fff0f0' },
  mint: { primary: '#55efc4', secondary: '#00b894', bg: '#f0fff9' },
  bubblegum: { primary: '#fd79a8', secondary: '#e84393', bg: '#fff0f6' },
  cyber: { primary: '#00cec9', secondary: '#0984e3', bg: '#e8f8f8' },
};

function ProfileCard({ profile }) {
  const router = useRouter();
  const themeColors = themes[profile.theme] || themes.ocean;
  
  return (
    <div 
      onClick={() => router.push(`/p/${profile.username}`)}
      className="rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform bg-white"
      style={{ borderTop: `4px solid ${themeColors.primary}` }}
    >
      <div 
        className="h-24"
        style={{
          background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
        }}
      />
      <div className="p-4 -mt-12 relative">
        {profile.photo_url ? (
          <img 
            src={profile.photo_url} 
            alt={profile.username}
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
          />
        ) : (
          <div 
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg mx-auto flex items-center justify-center text-3xl"
            style={{ backgroundColor: themeColors.secondary }}
          >
            🎭
          </div>
        )}
        <h3 className="text-lg font-bold text-center mt-3 text-slate-800 truncate">
          {profile.username}
        </h3>
        <p className="text-sm text-center text-slate-600 mt-1 line-clamp-2">
          {profile.job_title}
        </p>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    loadProfiles();
  }, []);
  
  const loadProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await getRandomProfiles(12);
      if (data) {
        setProfiles(data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to load profiles:', err);
      setLoading(false);
    }
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadProfiles();
    setRefreshing(false);
  };
  
  const handleSurpriseMe = () => {
    if (profiles.length > 0) {
      const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
      router.push(`/p/${randomProfile.username}`);
    }
  };
  
  return (
    <main className="min-h-screen pb-20">
      <Navbar />
      
      <section className="pt-32 px-4 max-w-6xl mx-auto">
        <div className="aero-card p-8 bg-white/40 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-aero-ocean mb-2">
                Explore Maxfolios
              </h1>
              <p className="text-slate-600">
                Discover the beautiful chaos created by others
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSurpriseMe}
                disabled={profiles.length === 0}
                className="px-6 py-3 bg-gradient-to-b from-aero-sky to-aero-ocean text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 flex items-center gap-2"
              >
                <Shuffle size={18} />
                Surprise Me!
              </button>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-6 py-3 bg-white text-aero-ocean border-2 border-aero-ocean rounded-full font-bold hover:bg-blue-50 transition-colors disabled:opacity-50"
              >
                {refreshing ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  '↻ Refresh'
                )}
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-aero-ocean" size={48} />
            </div>
          ) : profiles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600 mb-4">
                No profiles yet! Be the first to create chaos! 🎭
              </p>
              <button
                onClick={() => router.push('/create')}
                className="px-6 py-3 bg-aero-ocean text-white rounded-full font-bold hover:bg-aero-sky transition-colors"
              >
                Create First Maxfolio
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
