import React, { useState, useEffect } from 'react';
import { generateUsername, generatePassword, generateBio, generateJob } from '../../lib/generators';

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    job: '',
    bio: '',
    skills: '',
    portfolio_url: ''
  });
  const [isPublishing, setIsPublishing] = useState(false);

  const reroll = (key) => {
    let newVal = '';
    if (key === 'username') newVal = generateUsername();
    if (key === 'password') newVal = generatePassword();
    if (key === 'job') newVal = generateJob().title;
    if (key === 'bio') newVal = generateBio();
    if (key === 'skills') {
      const allSkills = ['Napping', 'Scrolling', 'Panic', 'Snacking', 'Staring', 'Winning', 'Crying', 'Procrastinating', 'Hoarding', 'Vibing', 'Existing', 'Calculating', 'Dreaming', 'Failing', 'Recursion', 'Void-Walking', 'Pixel-Sorting'];
      newVal = allSkills.sort(() => 0.5 - Math.random()).slice(0, 10).join(', ');
    }
    if (key === 'portfolio_url') {
        const prefixes = ['maxfolio.io/', 'void.net/~', 'chaos.biz/profile/', 'geocities.com/area51/'];
        newVal = `https://${prefixes[Math.floor(Math.random() * prefixes.length)]}${formData.username || 'user'}`;
    }
    
    setFormData(prev => ({ ...prev, [key]: newVal }));
  };

  useEffect(() => {
    ['username', 'password', 'job', 'bio', 'skills', 'portfolio_url'].forEach(reroll);
  }, []);

  /**
   * PUBLISH HANDLER
   * Sends the final chaotic profile to the API.
   * Profiles are immutable once published (stored in Postgres).
   */
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        alert('SUCCESS! Your digital identity is now etched into the mainframe. You cannot edit this. If you wish to evolve, create another account.');
        window.location.href = '/explore';
      } else {
        alert('ERROR: The mainframe rejected your submission. Try again later.');
      }
    } catch (error) {
      alert('CRITICAL ERROR: Connection to the void lost.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center min-h-screen bg-[#008080]">
      <div className="win95-window w-full max-w-2xl">
        <div className="win95-title-bar">
          <span>Profile Configuration Wizard v2.0</span>
          <div className="flex gap-1">
            <button className="win95-button py-0 px-1 text-xs">_</button>
            <button className="win95-button py-0 px-1 text-xs font-bold">X</button>
          </div>
        </div>
        
        <div className="p-6 space-y-4 bg-[#c0c0c0]">
          <div className="win95-inset p-4 bg-white text-sm border-2 border-black">
            <h3 className="font-bold text-lg mb-2 text-blue-900 underline uppercase italic">Meta-Portfolio Deployment Instructions</h3>
            <p className="mb-1">1. Reroll attributes until you reach peak chaotic synergy.</p>
            <p className="mb-1">2. Note: Your profile is <span className="text-red-600 font-bold uppercase underline">immutable</span> once deployed.</p>
            <p>3. If you hate your past self, simply manifest a <span className="font-bold italic">new</span> self via the wizard.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData).map(key => (
                <div key={key} className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-800 tracking-wider flex justify-between">
                    {key.replace('_', ' ')}
                    <span className="text-blue-700 italic">AUTO-GEN ACTIVE</span>
                </label>
                <div className="flex gap-1">
                    <input 
                    type="text" 
                    value={formData[key]} 
                    onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                    className="win95-inset flex-1 text-xs outline-none p-2 bg-white font-mono"
                    />
                    <button onClick={() => reroll(key)} className="win95-button text-[10px] px-2">Reroll</button>
                </div>
                </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-8 border-t-2 border-gray-400">
            <div className="text-[10px] italic text-gray-600">Build: 95.0.Vista.Chaos</div>
            <div className="flex gap-2">
                <button 
                className="win95-button px-10 py-2 text-lg" 
                onClick={handlePublish}
                disabled={isPublishing}
                >
                {isPublishing ? 'DEPLOYING...' : 'PUBLISH PROFILE'}
                </button>
                <button className="win95-button px-6" onClick={() => window.location.href = '/'}>ABORT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
