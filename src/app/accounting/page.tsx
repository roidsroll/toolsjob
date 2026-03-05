'use client';

import React from 'react';

export default function AccountingPage() {
  return (
    <div className="min-h-screen bg-emerald-50 text-emerald-950 flex flex-col items-center justify-center p-12">
      <div className="max-w-5xl w-full bg-white p-12 rounded-lg shadow-sm border border-emerald-100">
        <h1 className="text-3xl font-serif font-semibold text-emerald-800 border-b border-emerald-200 pb-6 mb-10 tracking-tight">Ledger & Financial Statements</h1>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center p-6 bg-emerald-100/30 rounded border border-emerald-100">
            <span className="text-lg font-medium">Monthly Revenue</span>
            <span className="text-2xl font-bold text-emerald-700">$ 42,900.00</span>
          </div>
          <div className="flex justify-between items-center p-6 bg-emerald-100/30 rounded border border-emerald-100">
            <span className="text-lg font-medium">Expenses</span>
            <span className="text-2xl font-bold text-red-600">($ 18,340.50)</span>
          </div>
          <div className="flex justify-between items-center p-6 bg-emerald-700 text-white rounded shadow-md">
            <span className="text-xl font-bold">Net Profit</span>
            <span className="text-3xl font-extrabold">$ 24,559.50</span>
          </div>
        </div>
        
        <button 
          onClick={() => window.location.href = '/auth'}
          className="mt-16 text-sm uppercase tracking-widest font-bold text-emerald-600 hover:text-emerald-800 transition-all border-b-2 border-emerald-600 pb-1"
        >
          ← Return to Portal
        </button>
      </div>
    </div>
  );
}
