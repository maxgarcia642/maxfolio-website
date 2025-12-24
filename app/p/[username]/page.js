'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import { getProfile } from '../../../lib/supabase';
import { Share2, Sparkles, Loader2 } from 'lucide-react';

// Theme configurations
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

export default function ProfilePage({ params }) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const username = params.username;
  
  useEffect(() => {
    async function loadProfile() {
      try {
        const { data, error } = await getProfile(username);
        if (error || !data) {
          setError('Profile not found! 🤔');
          setLoading(false);
          return;
        }
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile');
        setLoading(false);
      }
    }
    
    loadProfile();
  }, [username]);
  
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  if (loading) {
    return (
      <main className="min-h-screen pb-20">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <Loader2 className="animate-spin text-aero-ocean" size={48} />
        </div>
      </main>
    );
  }
  
  if (error || !profile) {
    return (
      <main className="min-h-screen pb-20">
        <Navbar />
        <div className="pt-32 px-4 max-w-2xl mx-auto text-center">
          <div className="aero-card p-10 bg-white/40">
            <h1 className="text-4xl font-bold text-slate-700 mb-4">😵</h1>
            <h2 className="text-2xl font-bold text-slate-700 mb-4">{error}</h2>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-aero-ocean text-white rounded-full font-bold hover:bg-aero-sky transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </main>
    );
  }
  
  const themeColors = themes[profile.theme] || themes.ocean;
  
  return (
    <main className="min-h-screen pb-20" style={{ backgroundColor: themeColors.bg }}>
      <Navbar />
      
      <section className="pt-32 px-4 max-w-3xl mx-auto">
        <div 
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ 
            backgroundColor: 'white',
            borderTop: `8px solid ${themeColors.primary}`,
          }}
        >
          {/* Header with theme colors */}
          <div 
            className="h-32"
            style={{
              background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
            }}
          />
          
          {/* Profile Content */}
          <div className="px-8 pb-8 -mt-16 relative">
            {/* Photo */}
            {profile.photo_url ? (
              <img 
                src={profile.photo_url} 
                alt={profile.username}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover mx-auto"
              />
            ) : (
              <div 
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl mx-auto flex items-center justify-center text-5xl"
                style={{ backgroundColor: themeColors.secondary }}
              >
                🎭
              </div>
            )}
            
            {/* Username */}
            <h1 className="text-3xl font-extrabold text-center mt-4" style={{ color: themeColors.secondary }}>
              {profile.username}
            </h1>
            
            {/* Job Title */}
            <p className="text-xl text-center text-slate-700 mt-2 font-medium">
              {profile.job_title}
            </p>
            
            {/* Bio */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-slate-700 mb-2">About Me</h3>
              <p className="text-slate-600">{profile.bio}</p>
            </div>
            
            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="mt-6">
                <h3 className="font-bold text-slate-700 mb-3">Skills</h3>
                <div className="space-y-2">
                  {profile.skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className="px-4 py-3 rounded-xl text-white font-medium shadow-md"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Actions */}
            <div className="mt-8 flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-slate-700 text-white rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <Share2 size={18} />
                {copied ? 'Copied!' : 'Share Profile'}
              </button>
              <button
                onClick={() => router.push('/create')}
                className="px-6 py-3 text-white rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
                style={{ 
                  background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
                }}
              >
                <Sparkles size={18} />
                Create Your Own
              </button>
            </div>
            
            {/* Created date */}
            <p className="text-center text-xs text-slate-400 mt-6">
              Created {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
