'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, ArrowUpRight, Target, Layers, Zap } from 'lucide-react';

export default function ROICalculator() {
  const [investment, setInvestment] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [extraCosts, setExtraCosts] = useState<number>(0);
  
  const [results, setResults] = useState({
    roi: 0,
    netProfit: 0,
    margin: 0,
    multiple: 0
  });

  useEffect(() => {
    const totalCost = Number(investment) + Number(extraCosts);
    const netProfit = Number(revenue) - totalCost;
    const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
    const margin = Number(revenue) > 0 ? (netProfit / Number(revenue)) * 100 : 0;
    const multiple = totalCost > 0 ? Number(revenue) / totalCost : 0;

    setResults({
      roi,
      netProfit,
      margin,
      multiple
    });
  }, [investment, revenue, extraCosts]);

  const formatDisplay = (val: number): string => {
    if (!val) return "";
    return new Intl.NumberFormat('id-ID').format(val);
  };

  const parseInput = (str: string): number => {
    const cleanStr = str.replace(/\./g, '').replace(/,/g, '.');
    return cleanStr === "" ? 0 : Number(cleanStr);
  };

  const formatCompact = (val: number): string => {
    const absVal = Math.abs(val);
    const sign = val < 0 ? "-" : "";
    if (absVal >= 1e9) return sign + "Rp " + (absVal / 1e9).toFixed(1) + " M";
    if (absVal >= 1e6) return sign + "Rp " + (absVal / 1e6).toFixed(1) + " Jt";
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  const ProgressBar = ({ label, value, percent, suffix = "%", icon: Icon }: any) => (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2 text-neutral-500">
          <Icon className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </div>
        <span className="text-sm font-black">{value}{suffix}</span>
      </div>
      <div className="h-3 bg-neutral-100 border border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <div 
          className="h-full bg-black transition-all duration-500 ease-out"
          style={{ width: `${Math.min(Math.max(percent, 0), 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full mb-12 bg-white">
      {/* Header - Mobile Optimized */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Kalkulator ROI</h2>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Revenue Metric Engine</p>
        </div>
        <div className="bg-yellow-300 border-2 border-black px-2 py-1 text-[10px] font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          IDR
        </div>
      </div>

      <div className="space-y-8">
        {/* Input Section - Larger Touch Targets */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "Total Investasi", val: investment, set: setInvestment },
            { label: "Total Pendapatan", val: revenue, set: setRevenue },
            { label: "Biaya Tambahan", val: extraCosts, set: setExtraCosts }
          ].map((item, i) => (
            <div key={i} className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">
                {item.label}
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-sm">Rp</span>
                <input 
                  type="text"
                  inputMode="numeric"
                  value={formatDisplay(item.val)}
                  onChange={(e) => item.set(parseInput(e.target.value.replace(/[^0-9.]/g, '')))}
                  className="w-full border-2 border-black p-4 pl-12 font-mono font-bold text-base md:text-lg focus:outline-none focus:bg-black focus:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  placeholder="0"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Results Section - Progress Bars */}
        <div className="bg-neutral-50 border-2 border-black p-4 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="flex flex-col border-b-2 border-black pb-3 mb-2 gap-1">
            <span className="text-[10px] md:text-xs font-black uppercase text-neutral-500">Estimasi Laba Bersih</span>
            <span className={`text-2xl md:text-3xl font-black whitespace-nowrap ${results.netProfit >= 0 ? 'text-black' : 'text-red-600'}`}>
              {formatCompact(results.netProfit)}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <ProgressBar 
              label="Return on Investment" 
              value={results.roi.toFixed(1)} 
              percent={results.roi} 
              icon={ArrowUpRight}
            />
            <ProgressBar 
              label="Margin Keuntungan" 
              value={results.margin.toFixed(1)} 
              percent={results.margin} 
              icon={Layers}
            />
            <ProgressBar 
              label="Multiplier (Target 5x)" 
              value={results.multiple.toFixed(2)} 
              percent={(results.multiple / 5) * 100} 
              suffix="x" 
              icon={Zap}
            />
          </div>
        </div>

        {/* Insight - Minimalist */}
        <div className="flex gap-4 p-4 border-2 border-black bg-white">
          <div className="bg-black text-white p-2 self-start shadow-[2px_2px_0px_0px_rgba(163,163,163,1)]">
            <Target className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-black uppercase text-[10px] tracking-wider">Performance Insight</h4>
            <p className="text-xs font-bold leading-tight text-neutral-600">
              {results.roi > 100 
                ? "Excellent. Returns are doubling cost." 
                : results.roi > 20 
                ? "Healthy growth performance." 
                : results.roi > 0 
                ? "Positive but needs optimization."
                : investment === 0 ? "Ready for calculation." : "Investment currently at loss."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
