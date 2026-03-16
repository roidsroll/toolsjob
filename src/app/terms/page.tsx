'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scale, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-neutral-50 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
          <Scale className="w-3 h-3" />
          <span>Legal Agreement</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 leading-tight uppercase">
          Terms of <br />
          <span className="text-neutral-400">Service.</span>
        </h1>

        <div className="space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-black pb-2">
              <FileText className="w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-widest">Ketentuan Penggunaan</h2>
            </div>
            <p className="text-neutral-600 font-medium leading-relaxed">
              Dengan mengakses ToolsJob, Anda setuju untuk terikat oleh ketentuan layanan ini. Platform ini disediakan "apa adanya" untuk membantu produktivitas profesional Anda.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-black pb-2">
              <ShieldAlert className="w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-widest">Batasan Tanggung Jawab</h2>
            </div>
            <p className="text-neutral-600 font-medium leading-relaxed">
              ToolsJob tidak bertanggung jawab atas kesalahan perhitungan atau kehilangan data lokal yang disebabkan oleh pembersihan cache browser atau kerusakan perangkat pengguna.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-black pb-2">
              <CheckCircle2 className="w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-widest">Lisensi</h2>
            </div>
            <p className="text-neutral-600 font-medium leading-relaxed">
              Penggunaan alat-alat dalam platform ini diizinkan untuk keperluan personal maupun bisnis tanpa biaya, selama tidak melanggar hukum yang berlaku.
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
          ToolsJob &copy; 2026
        </span>
      </footer>
    </div>
  );
}
