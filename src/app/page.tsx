import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, Landmark, Command, Fingerprint } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center text-center">
        {/* Minimalist Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-neutral-50 text-[12px] font-bold uppercase tracking-[0.2em] mb-10 animate-fade-in">
          <Command className="w-3 h-3" />
          <span>Professional Standard 2026</span>
        </div>

        {/* Hero Title - High Contrast */}
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-black">
          THE ART OF <br />
          <span className="text-neutral-400">PRECISION.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-neutral-500 mb-14 max-w-xl mx-auto font-medium leading-relaxed">
          Sistem manajemen terpadu untuk Network Engineer, Marketing, dan Accountant. 
          Satu platform, performa maksimal tanpa kompromi.
        </p>
        
        {/* Monochrome CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
          <Link href="/auth">
            <Button size="lg" className="h-14 px-12 text-md font-bold rounded-none bg-black text-white hover:bg-neutral-800 transition-all group">
              ACCESS PORTAL
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-14 px-12 text-md font-bold rounded-none border-2 border-black hover:bg-black hover:text-white transition-all">
            DOCUMENTATION
          </Button>
        </div>

        {/* Feature Icons - Stark Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl border-t border-black/5 pt-20">
          <div className="flex flex-col items-center gap-4 group cursor-default">
            <div className="w-16 h-16 flex items-center justify-center border border-black/10 group-hover:bg-black group-hover:text-white transition-all duration-500">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-1">Infrastructure</h3>
              <p className="text-xs text-neutral-400 font-medium">Enterprise Network Security</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 group cursor-default">
            <div className="w-16 h-16 flex items-center justify-center border border-black/10 group-hover:bg-black group-hover:text-white transition-all duration-500">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-1">Growth</h3>
              <p className="text-xs text-neutral-400 font-medium">Global Marketing Engine</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 group cursor-default">
            <div className="w-16 h-16 flex items-center justify-center border border-black/10 group-hover:bg-black group-hover:text-white transition-all duration-500">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-1">Financial</h3>
              <p className="text-xs text-neutral-400 font-medium">Precision Accounting Tools</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-black/5 flex flex-col items-center gap-4">
        <Fingerprint className="w-6 h-6 opacity-20" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300">
          Secure Environment &copy; 2026
        </span>
      </footer>
    </div>
  );
}
