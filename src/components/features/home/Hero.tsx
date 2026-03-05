import React from 'react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white text-black selection:bg-black selection:text-white">
      
      {/* Garis Border Dekoratif (Minimalist Frame) */}
    

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Label Atas */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-black"></div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase">
              Digital Experience 2026
            </p>
          </div>

          {/* Heading Utama */}
          <h1 className="text-5xl md:text-[120px] font-black leading-[0.9] tracking-tighter mb-10 italic">
            TOOLS <br />
            <span className="bg-black text-white px-2 not-italic">FOR</span> <br />
            YOU.
          </h1>

          {/* Grid Deskripsi & CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
              <p className="text-lg md:text-xl leading-relaxed max-w-sm text-gray-700">
                &copy;Tools Job Roi.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
              <button className="group relative px-8 py-4 bg-black text-white overflow-hidden transition-all">
                <span className="relative z-10 font-bold uppercase tracking-wider text-sm">
                  Let's Collaborate
                </span>
                <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              
              <button className="px-8 py-4 border border-black font-bold uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-colors duration-300">
                View Works
              </button>
            </div>
          </div>

        </div>
      </div>

   
    </section>
  );
}