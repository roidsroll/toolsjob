'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck, Eye, Lock, Database } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-24">
        {/* Minimalist Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-neutral-50 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
          <ShieldCheck className="w-3 h-3" />
          <span>Legal & Integrity</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 leading-tight uppercase">
          Privacy <br />
          <span className="text-neutral-400">Policy.</span>
        </h1>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-black pb-2">
              <Database className="w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-widest">Data Collection</h2>
            </div>
            <p className="text-neutral-600 font-medium leading-relaxed">
              Kami tidak menyimpan data pribadi Anda di server kami. Semua data kalkulasi dan fitur Venture (Split Bill) disimpan secara lokal di browser Anda menggunakan <span className="text-black font-bold italic">IndexedDB</span>. Data ini tidak pernah meninggalkan perangkat Anda.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-black pb-2">
              <Eye className="w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-widest">Usage</h2>
            </div>
            <p className="text-neutral-600 font-medium leading-relaxed">
              Data lokal digunakan semata-mata untuk memberikan pengalaman pengguna yang berkelanjutan (persistence), sehingga hasil kerja Anda tetap ada meskipun halaman di-refresh.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-black pb-2">
              <Lock className="w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-widest">Security</h2>
            </div>
            <p className="text-neutral-600 font-medium leading-relaxed">
              Keamanan data Anda bergantung pada keamanan perangkat dan browser yang Anda gunakan. Kami merekomendasikan penggunaan browser versi terbaru untuk perlindungan maksimal.
            </p>
          </section>
        </div>

        <div className="mt-20 border-t-4 border-black pt-12">
          <Link href="/">
            <Button variant="outline" size="lg" className="h-14 px-8 text-sm font-bold rounded-none border-2 border-black hover:bg-black hover:text-white transition-all group">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              BACK TO HOME
            </Button>
          </Link>
        </div>
      </main>

      <footer className="py-12 flex flex-col items-center gap-4 opacity-20">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
          Last Updated: March 2026
        </span>
      </footer>
    </div>
  );
}
