'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Info, RefreshCcw, AlertTriangle } from 'lucide-react';

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-neutral-50 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
          <Trash2 className="w-3 h-3" />
          <span>Data Management</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 leading-tight uppercase">
          Data <br />
          <span className="text-neutral-400">Deletion.</span>
        </h1>

        <div className="space-y-12">
          <section className="bg-black text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-black uppercase tracking-widest">Catatan Penting</h2>
            </div>
            <p className="text-neutral-400 font-bold leading-relaxed italic">
              "Data Anda <span className="text-white underline">tidak tersimpan</span> di server online atau database eksternal kami. Semua data kalkulasi dan Venture disimpan secara lokal di memori browser (RAM/IndexedDB)."
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-black pb-2">
              <RefreshCcw className="w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-widest">Cara Menghapus Data</h2>
            </div>
            <p className="text-neutral-600 font-medium leading-relaxed">
              Karena data bersifat lokal, Anda dapat menghapus seluruh data yang tersimpan dengan cara:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-neutral-600 font-bold">
              <li>Membersihkan <span className="text-black italic">Cache Browser</span> Anda.</li>
              <li>Menghapus <span className="text-black italic">Site Data</span> untuk domain ini melalui pengaturan browser.</li>
              <li>Menekan tombol "Reset" pada masing-masing alat jika tersedia.</li>
            </ul>
          </section>

          <section className="space-y-4 p-6 border-2 border-dashed border-red-600 bg-red-50">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-black uppercase tracking-widest text-red-600">Peringatan</h2>
            </div>
            <p className="text-red-800 text-sm font-bold">
              Setelah cache dibersihkan, data tidak dapat dipulihkan kembali karena kami tidak memiliki salinan cadangan di server kami.
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
          Secure Local Environment
        </span>
      </footer>
    </div>
  );
}
