'use client';

import Navbar from '../components/Navbar';
import { Sparkles, Users, Shuffle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section id="intro" className="min-h-screen flex flex-col items-center justify-center relative pt-20 px-4 text-center">
        {/* Background Decorative Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-aero-sky/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aero-grass/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="aero-card p-10 max-w-4xl z-10 bg-white/40 backdrop-blur-xl">
           <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-aero-ocean to-aero-sky mb-4 drop-shadow-sm">
             Welcome to Maxfolio
           </h1>
           <p className="text-xl md:text-2xl text-slate-700 font-light mb-4">
             The Internet's Most Chaotic Portfolio Generator
           </p>
           <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
             Create ridiculous profiles with silly job titles, random themes, and zero authentication required. 
             It's permanent chaos, and we love it! 🎭
           </p>
           <div className="flex gap-4 justify-center flex-wrap">
             <button 
               onClick={() => router.push('/create')}
               className="px-8 py-3 bg-gradient-to-b from-aero-sky to-aero-ocean text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
             >
               <Sparkles size={20} /> Create Your Maxfolio
             </button>
             <button 
               onClick={() => router.push('/explore')}
               className="px-8 py-3 bg-white text-aero-ocean border-2 border-aero-ocean rounded-full font-bold shadow-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
             >
               <Users size={20} /> Explore Random Maxfolios
             </button>
           </div>
        </div>
      </section>

      {/* --- PREVIEW SECTION --- */}
      <section id="preview" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="aero-card p-8 bg-gradient-to-br from-blue-50 to-white">
          <h2 className="text-3xl font-extrabold text-aero-ocean mb-6 flex items-center gap-3 justify-center">
            <Shuffle /> How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="font-bold text-aero-ocean mb-2">1. Generate Username</h3>
              <p className="text-sm text-gray-600">Get a random silly username like "cosmic-banana-47" or create your own!</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-bold text-aero-ocean mb-2">2. Add Your Chaos</h3>
              <p className="text-sm text-gray-600">Pick a ridiculous job title, write your bio, add skills, upload a photo!</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-bold text-aero-ocean mb-2">3. Get Random Theme</h3>
              <p className="text-sm text-gray-600">Receive a random color palette and share your unique Maxfolio URL!</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
         <div className="aero-card p-10 bg-white/40">
            <h2 className="text-3xl font-bold text-aero-grass mb-6">
              Features
            </h2>
            <ul className="text-left space-y-3 text-slate-700 max-w-2xl mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-aero-ocean font-bold">✓</span>
                <span>No login required - instant chaos!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aero-ocean font-bold">✓</span>
                <span>Random username generator with silly combinations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aero-ocean font-bold">✓</span>
                <span>20+ ridiculous job title suggestions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aero-ocean font-bold">✓</span>
                <span>Random color themes for unique profiles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aero-ocean font-bold">✓</span>
                <span>It's permanent - no editing! (That's the fun part)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-aero-ocean font-bold">✓</span>
                <span>Explore random profiles from around the chaos</span>
              </li>
            </ul>
         </div>
      </section>

      <footer className="py-6 text-center text-slate-500 text-sm bg-white/40 backdrop-blur-sm mt-20">
        &copy; 2025 Maxfolio. Embrace the chaos! Powered by Next.js & Supabase.
      </footer>
    </main>
  );
}
