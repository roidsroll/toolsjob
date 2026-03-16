'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Landmark } from 'lucide-react';
import ContextCalculator from '@/components/tools/ContextCalculator';

export default function AccountingPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-24">
        {/* Minimalist Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-neutral-50 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
          <Landmark className="w-3 h-3" />
          <span>Financial Division</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 leading-tight uppercase">
          Context <br />
          <span className="text-neutral-400">Calculator.</span>
        </h1>

        <div className="max-w-2xl">
          <ContextCalculator />
        </div>

        <div className="mt-16">
          <Link href="/auth">
            <Button variant="outline" size="lg" className="h-14 px-8 text-sm font-bold rounded-none border-2 border-black hover:bg-black hover:text-white transition-all group">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              RETURN TO PORTAL
            </Button>
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 opacity-20">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
          Ledger Verification System v2.0
        </span>
      </footer>
    </div>
  );
}
