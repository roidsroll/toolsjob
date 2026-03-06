'use client';

import React, { useState } from 'react';
import hashtagsData from '@/utils/hashtags.json';
import ROICalculator from '@/components/tools/ROICalculator';

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
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-start md:justify-center p-4 md:p-8 font-sans">
      <div className="max-w-4xl w-full md:border-2 md:border-black p-2 md:p-12 md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter border-b-4 border-black pb-4 md:pb-6 mb-8 mt-20 md:mt-0">
          Marketing Suite
        </h1>
        
        {/* ROI Calculator Section */}
        <ROICalculator />

        {/* Hashtag Generator Section */}
        <div className="py-8 border-t-2 border-black/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <span className="bg-black text-white px-2 py-0.5 text-xs italic">NEW</span> 
              Hashtag Generator
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1.5 block ml-1">Pilih Niche</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category)}
                  className="w-full border-2 border-black p-3.5 font-bold uppercase text-sm focus:outline-none focus:bg-black focus:text-white transition-all appearance-none cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  {Object.keys(hashtagsData).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={generateHashtags}
                  className="w-full bg-black text-white font-black uppercase py-4 md:py-3.5 px-4 text-xs tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                >
                  Generate
                </button>
              </div>
            </div>

            {generatedHashtags && (
              <div className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1.5 block ml-1">Resulting Hashtags</label>
                <textarea 
                  readOnly
                  value={generatedHashtags}
                  className="w-full h-40 border-2 border-black p-4 font-mono text-sm leading-relaxed focus:outline-none bg-neutral-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] resize-none"
                />
                <button 
                  onClick={copyToClipboard}
                  className="absolute right-4 top-10 p-2 bg-white border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M20 6 9 17l-5-5"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  )}
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
