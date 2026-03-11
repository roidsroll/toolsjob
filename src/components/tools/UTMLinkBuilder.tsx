'use client';

import React, { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  required?: boolean;
}

const InputField = ({ label, value, onChange, placeholder, required = false }: InputFieldProps) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1 flex justify-between">
      {label}
      {required && <span className="text-black font-black">* Required</span>}
    </label>
    <input 
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-2 border-black p-3 font-bold text-sm focus:outline-none focus:bg-black focus:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
      placeholder={placeholder}
    />
  </div>
);

export default function UTMLinkBuilder() {
  const [baseUrl, setBaseUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  const generatedUrl = (() => {
    if (!baseUrl) return '';
    try {
      const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`);
      
      if (source) url.searchParams.set('utm_source', source);
      if (medium) url.searchParams.set('utm_medium', medium);
      if (campaign) url.searchParams.set('utm_campaign', campaign);
      if (term) url.searchParams.set('utm_term', term);
      if (content) url.searchParams.set('utm_content', content);
      
      return url.toString();
    } catch {
      return 'Invalid URL';
    }
  })();

  const handleCopy = () => {
    if (!generatedUrl || generatedUrl === 'Invalid URL') return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full mb-12 bg-white pt-8 border-t-2 border-black/10">
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
            <span className="bg-black text-white px-2 py-0.5 text-xs italic">PRO</span> 
            UTM Link Builder
          </h2>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Campaign Tracking Architect</p>
        </div>
        <div className="bg-blue-300 border-2 border-black px-2 py-1 text-[10px] font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          SEO/ADS
        </div>
      </div>

      <div className="space-y-6">
        <InputField 
          label="Website URL" 
          value={baseUrl} 
          onChange={setBaseUrl} 
          placeholder="example.com" 
          required 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField 
            label="Campaign Source" 
            value={source} 
            onChange={setSource} 
            placeholder="google, newsletter, facebook" 
          />
          <InputField 
            label="Campaign Medium" 
            value={medium} 
            onChange={setMedium} 
            placeholder="cpc, banner, email" 
          />
          <InputField 
            label="Campaign Name" 
            value={campaign} 
            onChange={setCampaign} 
            placeholder="summer_sale, promo_launch" 
          />
          <InputField 
            label="Campaign Term" 
            value={term} 
            onChange={setTerm} 
            placeholder="running+shoes, keyword" 
          />
        </div>

        <InputField 
          label="Campaign Content" 
          value={content} 
          onChange={setContent} 
          placeholder="logolink, textlink" 
        />

        {/* Result Section */}
        <div className="bg-neutral-50 border-2 border-black p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase text-neutral-500">Generated URL Preview</span>
            <div className="relative group">
              <textarea 
                readOnly
                value={generatedUrl}
                className="w-full min-h-[80px] border-2 border-black p-4 pr-14 font-mono text-xs leading-relaxed focus:outline-none bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] resize-none"
                placeholder="The UTM link will appear here..."
              />
              <button 
                onClick={handleCopy}
                disabled={!generatedUrl || generatedUrl === 'Invalid URL'}
                className="absolute right-3 top-3 p-2 bg-white border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="flex gap-4 p-4 border-2 border-black bg-white">
          <div className="bg-black text-white p-2 self-start shadow-[2px_2px_0px_0px_rgba(163,163,163,1)]">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-black uppercase text-[10px] tracking-wider">UTM Best Practices</h4>
            <p className="text-xs font-bold leading-tight text-neutral-600">
              Use consistent naming conventions (lowercase only), avoid spaces (use hyphens or underscores), and keep campaign names short and descriptive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
