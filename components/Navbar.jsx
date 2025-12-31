import React from 'react';

export default function Navbar() {
  return (
    <nav className="win95-window m-2 flex justify-between items-center px-4 py-1">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-blue-800 flex items-center justify-center text-[10px] text-white font-bold">M</div>
        <a href="/" className="font-bold">Maxfolio Explorer</a>
      </div>
      <div className="flex gap-4 text-sm">
        <a href="/explore" className="hover:underline">Explore</a>
        <a href="/create" className="hover:underline">Create</a>
      </div>
    </nav>
  );
}
