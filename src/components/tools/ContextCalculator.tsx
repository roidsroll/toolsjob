'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, 
  Undo2, 
  Redo2, 
  Maximize2, 
  X, 
  Copy, 
  Check, 
  Users, 
  Wallet, 
  Save, 
  UserCircle2,
  Download,
  ArrowDown
} from 'lucide-react';

// --- IndexedDB Helper ---
const DB_NAME = 'VentureDB';
const STORE_NAME = 'ventures';
const DB_VERSION = 1;

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveToDB = async (data: any) => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ id: 'current_venture', ...data });
    return new Promise((resolve) => {
      tx.oncomplete = () => resolve(true);
    });
  } catch (e) {
    console.error("Failed to save to DB:", e);
  }
};

const loadFromDB = async () => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get('current_venture');
    return new Promise((resolve) => {
      request.onsuccess = () => resolve(request.result);
    });
  } catch (e) {
    console.error("Failed to load from DB:", e);
    return null;
  }
};

export default function ContextCalculator() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // --- Basic Mode State ---
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState<{display: string, equation: string}[]>([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // --- Venture Mode State ---
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [numPeople, setNumPeople] = useState<number>(2);
  const [participants, setParticipants] = useState<{id: number, name: string, isPaid: boolean}[]>([]);
  const [prevLen, setPrevLen] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- Persistence & Sync ---
  useEffect(() => {
    const loadData = async () => {
      const savedData: any = await loadFromDB();
      if (savedData) {
        setTotalPrice(savedData.totalPrice || 0);
        setNumPeople(savedData.numPeople || 2);
        setParticipants(savedData.participants || []);
      }
      setIsLoaded(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    setParticipants(prev => {
      const current = [...prev];
      if (current.length < numPeople) {
        for (let i = current.length; i < numPeople; i++) {
          current.push({ id: Date.now() + i, name: `Peserta ${i + 1}`, isPaid: false });
        }
      } else if (current.length > numPeople) {
        return current.slice(0, numPeople);
      }
      return current;
    });
  }, [numPeople, isLoaded]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      if (participants.length > prevLen) {
        setTimeout(() => {
          scrollContainerRef.current?.scrollTo({ 
            top: scrollContainerRef.current.scrollHeight, 
            behavior: 'smooth' 
          });
        }, 100);
      } else if (participants.length < prevLen) {
        scrollContainerRef.current.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
      }
    }
    setPrevLen(participants.length);
  }, [participants.length, prevLen]);

  // --- Calculations & Actions ---
  const handleSaveVenture = async () => {
    await saveToDB({ totalPrice, numPeople, participants });
    alert("Venture saved successfully!");
  };

  const handleExportExcel = () => {
    const splitAmount = totalPrice / (numPeople || 1);
    const headers = ["Per Orang", "Nominal Harus Bayar", "Status Bayar"];
    const rows = participants.map(p => [
      p.name,
      `Rp ${splitAmount.toLocaleString('id-ID')}`,
      p.isPaid ? "Lunas" : "Belum Bayar"
    ]);
    const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `venture_${new Date().getTime()}.csv`;
    link.click();
  };

  const pushToHistory = (newDisplay: string, newEquation: string) => {
    const newEntry = { display: newDisplay, equation: newEquation };
    const newHistory = history.slice(0, historyPointer + 1);
    newHistory.push(newEntry);
    if (newHistory.length > 20) newHistory.shift();
    setHistory(newHistory);
    setHistoryPointer(newHistory.length - 1);
  };

  const handleBasicClick = (val: string) => {
    let nextDisplay = display;
    let nextEquation = equation;
    if (val === 'C') {
      nextDisplay = '0'; nextEquation = '';
    } else if (val === '=') {
      try {
        const result = eval(equation.replace('×', '*').replace('÷', '/'));
        nextDisplay = String(result); nextEquation = String(result);
      } catch { nextDisplay = 'Error'; }
    } else {
      if (display === '0' && !['+', '-', '×', '÷'].includes(val)) {
        nextDisplay = val; nextEquation = val;
      } else {
        nextDisplay = display + val; nextEquation = equation + val;
      }
    }
    setDisplay(nextDisplay); setEquation(nextEquation);
    pushToHistory(nextDisplay, nextEquation);
  };

  const handleUndo = () => {
    if (historyPointer > 0) {
      const prev = history[historyPointer - 1];
      setDisplay(prev.display); setEquation(prev.equation);
      setHistoryPointer(historyPointer - 1);
    } else if (historyPointer === 0) {
      setDisplay('0'); setEquation(''); setHistoryPointer(-1);
    }
  };

  const handleRedo = () => {
    if (historyPointer < history.length - 1) {
      const next = history[historyPointer + 1];
      setDisplay(next.display); setEquation(next.equation);
      setHistoryPointer(historyPointer + 1);
    }
  };

  return (
    <div className="w-full bg-white space-y-12 pb-20">
      
      {/* SECTION 1: BASIC CALCULATOR */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-black text-white p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Standard Calc</h2>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Precision Engine</p>
          </div>
        </div>

        <div className="w-full">
          <div className="flex justify-end gap-2 mb-4">
            <button onClick={handleUndo} disabled={historyPointer < 0} className="p-2 border-2 border-black bg-white hover:bg-neutral-100 disabled:opacity-30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"><Undo2 className="w-4 h-4" /></button>
            <button onClick={handleRedo} disabled={historyPointer >= history.length - 1} className="p-2 border-2 border-black bg-white hover:bg-neutral-100 disabled:opacity-30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"><Redo2 className="w-4 h-4" /></button>
          </div>
          
          <div className="bg-neutral-100 border-2 border-black p-8 text-right mb-6 relative group">
            {display.length > 10 && (
              <button onClick={() => setIsModalOpen(true)} className="absolute left-3 top-3 p-1.5 border border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 hover:bg-neutral-50"><Maximize2 className="w-3 h-3" /></button>
            )}
            <div className="text-5xl font-black tracking-tighter truncate">{display}</div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', 'C', '0', '=', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleBasicClick(btn)}
                className={`h-20 flex items-center justify-center font-black text-2xl border-2 border-black transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                  ${btn === '=' ? 'bg-black text-white' : btn === 'C' ? 'bg-red-100' : ['+', '-', '×', '÷'].includes(btn) ? 'bg-yellow-100' : 'bg-white'}`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SEPARATOR */}
      <div className="flex items-center justify-center gap-6 py-8">
        <div className="h-[2px] flex-1 bg-black/10" />
        <ArrowDown className="w-6 h-6 text-neutral-300 animate-bounce" />
        <div className="h-[2px] flex-1 bg-black/10" />
      </div>

      {/* SECTION 2: VENTURE (SPLIT BILL) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-black text-white p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Venture Split</h2>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Shared Expenses</p>
          </div>
        </div>

        <div className="w-full space-y-8">
          <div className="bg-black text-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] flex justify-between items-start border-2 border-black">
            <div className="flex-1">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1">Per Person Cost</div>
              <div className="text-5xl font-black italic tracking-tighter">Rp {(totalPrice / (numPeople || 1)).toLocaleString('id-ID')}</div>
            </div>
            <div className="flex flex-col gap-2">
              <Wallet className="w-6 h-6 opacity-20 self-end" />
              <button onClick={handleExportExcel} className="bg-white text-black p-3 border-2 border-black hover:bg-neutral-100 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-0.5"><Download className="w-5 h-5" /></button>
            </div>
          </div>

          <div ref={scrollContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar scroll-smooth p-1">
            {participants.map((p) => (
              <div key={p.id} className={`border-2 border-black p-5 flex items-center gap-4 transition-all duration-300 ${p.isPaid ? 'bg-green-50' : 'bg-white'} shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
                <div className={`p-3 border-2 border-black ${p.isPaid ? 'bg-green-500 text-white' : 'bg-neutral-100'}`}><UserCircle2 className="w-6 h-6" /></div>
                <div className="flex-1 space-y-1">
                  <input value={p.name} onChange={(e) => setParticipants(participants.map(part => part.id === p.id ? { ...part, name: e.target.value } : part))} className="w-full text-base font-black uppercase bg-transparent border-b-2 border-black/5 focus:border-black focus:outline-none" placeholder="Masukkan nama..." />
                  <div className="text-xs font-bold text-neutral-400">SHARE: Rp {(totalPrice / numPeople).toLocaleString('id-ID')}</div>
                </div>
                <button onClick={() => setParticipants(participants.map(part => part.id === p.id ? { ...part, isPaid: !part.isPaid } : part))} className={`p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none ${p.isPaid ? 'bg-black text-white' : 'bg-white'}`}>{p.isPaid ? <Check className="w-5 h-5" /> : <div className="w-5 h-5" />}</button>
              </div>
            ))}
          </div>

          <div className="space-y-6 pt-6 border-t-2 border-black/10">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">Total Amount (Rp)</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-xl">Rp</span>
                <input type="number" value={totalPrice || ''} onChange={(e) => setTotalPrice(Number(e.target.value))} className="w-full border-4 border-black p-6 pl-16 font-black text-3xl focus:bg-neutral-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" placeholder="0" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">Number of People</label>
                <div className="flex border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <button onClick={() => setNumPeople(Math.max(1, numPeople - 1))} className="flex-1 bg-white hover:bg-neutral-100 p-5 font-black border-r-4 border-black text-2xl">-</button>
                  <div className="flex-[2] bg-white flex items-center justify-center font-black text-2xl">{numPeople}</div>
                  <button onClick={() => setNumPeople(numPeople + 1)} className="flex-1 bg-white hover:bg-neutral-100 p-5 font-black border-l-4 border-black text-2xl">+</button>
                </div>
              </div>
              <button onClick={handleSaveVenture} className="bg-black text-white font-black uppercase text-sm tracking-widest flex items-center justify-center gap-4 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-[-4px] active:translate-y-1 transition-all"><Save className="w-6 h-6" /> Save Venture</button>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL FULL DISPLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative animate-in zoom-in-95">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 p-1 border-2 border-black"><X className="w-4 h-4" /></button>
            <div className="bg-neutral-50 border-2 border-black p-6 font-mono font-black text-2xl break-all mb-8 shadow-inner">{display}</div>
            <div className="flex gap-4">
              <button onClick={() => { navigator.clipboard.writeText(display); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); }} className="flex-1 bg-black text-white py-4 font-black uppercase flex items-center justify-center gap-2">{isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copy</button>
              <button onClick={() => setIsModalOpen(false)} className="flex-1 border-2 border-black py-4 font-black uppercase">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
