'use client';

import React, { useState } from 'react';
import hashtagsData from '@/utils/hashtags.json';

type Category = keyof typeof hashtagsData;

export default function BusinessMarketingPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('digital_marketing');
  const [generatedHashtags, setGeneratedHashtags] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const generateHashtags = () => {
    const tags = hashtagsData[selectedCategory];
    // Shuffle and pick 7-10 hashtags
    const shuffled = [...tags].sort(() => 0.5 - Math.random());
    const result = shuffled.slice(0, Math.floor(Math.random() * 4) + 7).join(' ');
    setGeneratedHashtags(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!generatedHashtags) return;
    navigator.clipboard.writeText(generatedHashtags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-4xl w-full border border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter border-b-4 border-black pb-6 mb-12">
          Marketing Suite
        </h1>
        
        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="group border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300">
            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Ad Campaigns</h3>
            <p className="text-5xl font-black">12</p>
            <p className="text-sm mt-2 opacity-70 group-hover:opacity-100 uppercase font-medium">Active Now</p>
          </div>
          <div className="group border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300">
            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Conversion Rate</h3>
            <p className="text-5xl font-black">4.8%</p>
            <p className="text-sm mt-2 text-neutral-500 group-hover:text-white uppercase font-medium">+1.2% Growth</p>
          </div>
        </div>

        {/* Hashtag Generator Section */}
        <div className="border-4 border-black p-8 mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
            <span className="bg-black text-white px-2 py-1 text-sm italic">New</span> 
            Hashtag Generator
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-black uppercase tracking-widest mb-2 block">Select Niche</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category)}
                className="w-full border-2 border-black p-3 font-bold uppercase text-sm focus:outline-none focus:bg-black focus:text-white transition-colors appearance-none cursor-pointer"
              >
                {Object.keys(hashtagsData).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={generateHashtags}
              className="w-full bg-black text-white font-black uppercase py-4 tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all active:translate-y-1"
            >
              Generate Hashtags
            </button>

            {generatedHashtags && (
              <div className="mt-8 border-2 border-black p-6 bg-neutral-50 relative animate-in fade-in slide-in-from-bottom-2">
                <p className="font-mono text-sm leading-relaxed mb-4">
                  {generatedHashtags}
                </p>
                <button 
                  onClick={copyToClipboard}
                  className="text-[10px] font-black uppercase tracking-widest border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={() => window.location.href = '/auth'}
          className="text-xs font-black uppercase tracking-widest border-b-2 border-black hover:bg-black hover:text-white px-4 py-2 transition-all duration-200"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}
