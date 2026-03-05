import React from 'react';
import { SubnetCalculator } from '@/components/tools/SubnetCalculator';
import { Terminal, Cpu, Shield, Globe, Settings, Network } from 'lucide-react';

export default function TechToolsDashboard() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-blue-500 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Settings className="w-5 h-5 animate-spin-slow" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Environment</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">IT TECH TOOLS</h1>
            <p className="text-zinc-500 text-lg font-medium max-w-xl leading-relaxed">
              Professional utility suite for Network Engineers and System Administrators. 
              Client-side execution for zero-latency operations.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">Status</span>
                <span className="text-emerald-500 font-mono text-sm font-bold flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  ONLINE [LOCAL]
                </span>
             </div>
          </div>
        </header>

        {/* Tools Layout */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Section 1: Network Core */}
           <div className="space-y-8">
              <div className="flex items-center gap-3 text-zinc-500">
                <Network className="w-4 h-4" />
                <h2 className="text-xs font-black uppercase tracking-widest">Network Core Functions</h2>
              </div>
              <SubnetCalculator />
              {/* Tool lain seperti BandwidthCalc, DNSLookup akan masuk di sini */}
           </div>

           {/* Section 2: Utilities & Security */}
           <div className="space-y-8">
              <div className="flex items-center gap-3 text-zinc-500">
                <Shield className="w-4 h-4" />
                <h2 className="text-xs font-black uppercase tracking-widest">Security & Ops Utils</h2>
              </div>
              {/* Tool seperti PasswordGen, PortScanner, BaseConverter akan masuk di sini */}
              <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/50 flex flex-col items-center justify-center text-center space-y-4">
                 <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center opacity-40">
                    <Cpu className="w-8 h-8" />
                 </div>
                 <h3 className="text-sm font-bold text-zinc-400">MORE TOOLS IN DEVELOPMENT</h3>
                 <p className="text-xs text-zinc-600 max-w-[200px]">DNS Lookup, Port Scanner, and Cable Reference are being synchronized.</p>
              </div>
           </div>
        </main>

        <footer className="pt-20 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              <Terminal className="w-3 h-3" />
              Build V1.0.4-STABLE / 2026
           </div>
        </footer>
      </div>
    </div>
  );
}
