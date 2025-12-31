import React, { useState, useEffect } from 'react';

export default function Home() {
  const [time, setTime] = useState('');

  // Effect hook to keep the clock updated every second
  useEffect(() => {
    const updateTime = () => {
      // Get Central Time (US) for that authentic Wii experience
      const ct = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(new Date());
      setTime(ct);
    };
    updateTime();
    // Update every 10 seconds to save on system "resources"
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const channels = [
    { title: "Main Menu", icon: "🏠", desc: "System Core", onClick: () => window.location.href = '/' },
    { title: "Explore", icon: "🌐", desc: "Corporate Network", onClick: () => window.location.href = '/explore?tab=users' },
    { title: "Users", icon: "👥", desc: "Active Registry", onClick: () => window.location.href = '/explore?tab=users' },
    { title: "Create Account", icon: "🧙‍♂️", desc: "Profile Wizard", onClick: () => window.location.href = '/create' },
    { title: "Sign In", icon: "🔐", desc: "Mainframe Audit", onClick: () => window.location.href = '/explore?tab=signin' },
    { title: "Jobs", icon: "💼", desc: "Available Jobs", onClick: () => window.location.href = '/explore?tab=jobs' },
    { title: "The Markets", icon: "💹", desc: "Market 5,000", onClick: () => window.location.href = '/explore?tab=economy' },
    { title: "Help", icon: "❓", desc: "External Docs", onClick: () => window.location.href = 'https://maxgarcia642.github.io/' },
  ];

  return (
    <div className="min-h-screen bg-[#008080] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl aspect-[4/3] bg-[#eef2f3] rounded-[60px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border-[16px] border-[#d9dfe1] relative overflow-hidden flex flex-col p-12">
        {/* Wii background accents */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full border-[30px] border-blue-200"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full border-[30px] border-blue-200"></div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="text-5xl font-black text-[#5a5e62] tracking-tighter italic drop-shadow-sm">
                        Maxfolio<span className="text-[#00a0e9]">Adventurer</span>
                    </div>
                    <div className="text-sm font-bold text-gray-400 mt-1 ml-1 tracking-widest uppercase">
                        Welcome to the Void
                    </div>
                </div>
                <div className="bg-white/80 px-8 py-3 rounded-full text-xl font-black text-gray-500 border-2 border-white shadow-inner">
                    {time || '--:-- --'}
                </div>
            </div>

            <div className="grid grid-cols-4 grid-rows-2 gap-6 flex-1 px-4">
                {channels.map((ch, idx) => (
                    <div 
                        key={idx}
                        onClick={ch.onClick}
                        className={`
                            relative bg-gradient-to-br from-white to-[#f0f3f5] rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.1)] 
                            border-2 border-white/80 flex flex-col items-center justify-center p-4 cursor-pointer
                            hover:scale-105 hover:shadow-2xl transition-all group overflow-hidden active:scale-95
                        `}
                    >
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{ch.icon}</div>
                        <div className="text-[11px] font-black text-gray-700 text-center leading-tight uppercase tracking-tighter">{ch.title}</div>
                        <div className="text-[9px] text-gray-400 mt-1 font-bold">{ch.desc}</div>
                        <div className="absolute top-0 left-0 w-full h-[45%] bg-white/40 rounded-t-2xl"></div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                 <div className="w-32 h-10 bg-white/60 rounded-full border-2 border-white/80 flex items-center justify-center shadow-sm">
                    <div className="w-4 h-4 border-2 border-blue-400 rounded-sm"></div>
                 </div>
            </div>
        </div>

        {/* Wii Menu Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-blue-400/20 via-transparent to-blue-400/20"></div>
      </div>
    </div>
  );
}
