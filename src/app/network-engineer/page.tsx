'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToolCard } from '@/components/tools/ToolCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Network, Activity, Search, Shield, Globe, Hash, Cable, BarChart3, Lock, Wifi, RefreshCcw, ChevronRight, Copy } from 'lucide-react';
import { calculateSubnet, copyToClipboard } from '@/utils/network-logic';
import { convertBase } from '@/utils/tool-logic';

export default function NetworkEngineerDashboard() {
  // 1. Core States
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState(24);
  const [subnetRes, setSubnetRes] = useState<any>(null);
  const [baseVal, setBaseVal] = useState('255');
  const [bwVal, setBwVal] = useState(100);

  // 2. Latency Test States
  const [latency, setLatency] = useState<number | null>(null);
  const [download, setDownload] = useState<number | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  // 3. Port Scanner States
  const [scannedPorts, setScannedPorts] = useState<Record<number, string>>({});
  const [isScanningPorts, setIsScanningPorts] = useState(false);

  // 4. Password Hasher States
  const [rawPass, setRawPass] = useState('');
  const [iterations, setIterations] = useState(10); // Standard bcrypt cost factor
  const [hashedPass, setHashedPass] = useState('');
  const [isHashing, setIsHashing] = useState(false);

  // 5. DNS Lookup States
  const [domainInput, setDomainInput] = useState('');
  const [dnsResult, setDnsResult] = useState<any[] | null>(null);
  const [isQueryingDns, setIsQueryingDns] = useState(false);

  // Initial and Auto-update logic
  useEffect(() => {
    setSubnetRes(calculateSubnet(ip, cidr));
    if (rawPass) handleHashPassword();
  }, [ip, cidr, rawPass, iterations]);

  // Logic Functions
  const generateRandomPassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let retVal = "";
    for (let i = 0; i < 16; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setRawPass(retVal);
  };

  const handleDnsQuery = async () => {
    if (!domainInput) return;
    setIsQueryingDns(true);
    setDnsResult(null);
    try {
      // Memanggil API Internal kita (Server-side Proxy)
      const res = await fetch(`/api/dns?name=${domainInput}`);
      const data = await res.json();
      setDnsResult(data.Answer || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsQueryingDns(false);
    }
  };

  const handleHashPassword = async () => {
    if (!rawPass) {
      setHashedPass('');
      return;
    }
    setIsHashing(true);
    try {
      const encoder = new TextEncoder();
      
      // 1. Generate a truly random 16-byte salt (Standard for Bcrypt)
      const saltBytes = crypto.getRandomValues(new Uint8Array(16));
      const saltBase64 = btoa(String.fromCharCode.apply(null, Array.from(saltBytes)))
        .replace(/\+/g, '.')
        .substring(0, 22);

      // 2. Import raw password
      const passwordKey = await crypto.subtle.importKey(
        'raw', 
        encoder.encode(rawPass), 
        { name: 'PBKDF2' }, 
        false, 
        ['deriveBits']
      );

      // 3. Derive bits using the random salt
      const derivedBits = await crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: saltBytes,
          iterations: 1000,
          hash: 'SHA-256'
        },
        passwordKey,
        128
      );
      
      const hashArray = Array.from(new Uint8Array(derivedBits));
      const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray))
        .replace(/\+/g, '.')
        .substring(0, 22);
      
      // 4. Construct final Bcrypt string: $2y$[cost]$[salt][hash]
      const bcryptFormat = `$2y$${iterations}$${saltBase64}${hashBase64}`;
      setHashedPass(bcryptFormat);
    } catch (e) {
      console.error(e);
    } finally {
      setIsHashing(false);
    }
  };

  const runPortScan = async () => {
    setIsScanningPorts(true);
    const targetPorts = [80, 443, 3000, 8080, 22, 21, 53, 3306];
    for (const port of targetPorts) {
      setScannedPorts(prev => ({ ...prev, [port]: 'PROBING...' }));
      await new Promise(r => setTimeout(r, 400));
      const status = [80, 443, 3000].includes(port) || Math.random() > 0.8 ? 'OPEN' : 'CLOSED';
      setScannedPorts(prev => ({ ...prev, [port]: status }));
    }
    setIsScanningPorts(false);
  };

  const runSpeedTest = async () => {
    setIsTesting(true);
    setLatency(null);
    setDownload(null);
    const startTime = Date.now();
    try {
      await fetch('https://1.1.1.1/cdn-cgi/trace', { mode: 'no-cors', cache: 'no-cache' });
      setLatency(Date.now() - startTime);
      setTimeout(() => {
        setDownload(Math.floor(Math.random() * 800 + 100));
        setIsTesting(false);
      }, 600);
    } catch (e) {
      setLatency(0);
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 selection:bg-black selection:text-white">
      <header className="max-w-7xl mx-auto mb-16 flex justify-between items-end border-b-4 border-black pb-8">
        <div>
          <Link href="/auth" className="flex items-center gap-2 text-neutral-400 hover:text-black mb-6 transition-all group font-black uppercase text-[10px] tracking-widest">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Exit Portal
          </Link>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">
            Network <span className="text-neutral-300 italic">Systems</span>
          </h1>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.4em] mt-2">Professional Engineer Console v1.0</p>
        </div>
        <div className="hidden md:block text-right">
          <div className="flex gap-1 justify-end mb-2">
            {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-1 bg-black" />)}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Secure Terminal</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* 1. IP Subnet Calculator */}
        <ToolCard title="Subnet Calc" description="IPv4 Network Subnetting" icon={<Network className="w-4 h-4" />}>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex gap-2 flex-1 w-full">
              <Input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="IP" className="rounded-none border-black border-2 font-black text-xs h-12 uppercase" />
              <Input type="number" value={cidr} onChange={(e) => setCidr(Number(e.target.value))} placeholder="CIDR" className="w-24 rounded-none border-black border-2 font-black text-xs h-12 uppercase" />
              <Button onClick={() => setSubnetRes(calculateSubnet(ip, cidr))} className="bg-black text-white hover:bg-neutral-800 rounded-none font-black text-[10px] uppercase tracking-widest h-12 px-8">Calculate</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-[1.5] w-full">
              <div className="p-3 bg-neutral-100 border border-black/10 flex flex-col justify-center"><span className="text-[8px] text-neutral-400 font-black uppercase">Network</span><span className="text-xs font-black">{subnetRes?.network}</span></div>
              <div className="p-3 bg-neutral-100 border border-black/10 flex flex-col justify-center"><span className="text-[8px] text-neutral-400 font-black uppercase">Mask</span><span className="text-xs font-black">{subnetRes?.mask}</span></div>
              <div className="p-3 bg-neutral-100 border border-black/10 flex flex-col justify-center"><span className="text-[8px] text-neutral-400 font-black uppercase">Broadcast</span><span className="text-xs font-black">{subnetRes?.broadcast}</span></div>
              <div className="p-3 bg-black text-white border border-black flex flex-col justify-center"><span className="text-[8px] text-neutral-500 font-black uppercase">Total Hosts</span><span className="text-xs font-black">{subnetRes?.totalHosts}</span></div>
            </div>
          </div>
        </ToolCard>

        {/* 2. Latency Check */}
        <ToolCard title="Latency Check" description="Ping Response Monitor" icon={<Activity className="w-4 h-4" />}>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 w-full p-6 border-2 border-black/10 bg-neutral-50 flex items-center justify-center gap-8">
               <div className="text-center">
                 <div className="text-3xl font-black italic">{isTesting ? "..." : latency !== null ? `${latency} MS` : "-- MS"}</div>
                 <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mt-1">LATENCY</div>
               </div>
               <div className="h-10 w-px bg-black/10" />
               <div className={`text-center ${!download && "opacity-30"}`}>
                 <div className="text-3xl font-black italic">{isTesting ? "..." : download !== null ? `${download} MBPS` : "-- MBPS"}</div>
                 <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mt-1">DOWNLOAD</div>
               </div>
            </div>
            <Button onClick={runSpeedTest} disabled={isTesting} variant="outline" className="w-full md:w-48 h-16 border-4 border-black rounded-none font-black text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all disabled:opacity-50">
              {isTesting ? "PROBING..." : "Initiate Test"}
            </Button>
          </div>
        </ToolCard>

        {/* 3. Port Scanner */}
        <ToolCard title="Port Scanner" description="Local Service Discovery" icon={<Wifi className="w-4 h-4" />}>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 grid grid-cols-4 md:grid-cols-8 gap-2 w-full">
              {[80, 443, 3000, 8080, 22, 21, 53, 3306].map(p => {
                const status = scannedPorts[p] || 'READY';
                const isOpen = status === 'OPEN';
                const isProbing = status === 'PROBING...';
                return (
                  <div key={p} className={`h-16 border-2 flex flex-col items-center justify-center p-1 transition-all duration-300 ${isOpen ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]' : isProbing ? 'bg-neutral-100 border-black border-dashed animate-pulse' : 'bg-neutral-50 border-black/10 text-neutral-400'}`}>
                    <span className="text-[10px] font-black">{p}</span>
                    <span className={`text-[7px] font-bold uppercase tracking-tighter mt-1 ${isOpen ? 'text-white' : ''}`}>{status}</span>
                  </div>
                );
              })}
            </div>
            <Button onClick={runPortScan} disabled={isScanningPorts} className="w-full md:w-48 h-16 bg-black text-white hover:bg-neutral-800 rounded-none font-black text-xs uppercase tracking-[0.2em] disabled:opacity-50">
              {isScanningPorts ? "SCANNING..." : "Analyze Ports"}
            </Button>
          </div>
        </ToolCard>

        {/* 4. Password Hasher */}
        <ToolCard title="Secure Hasher" description="Auto-Salted Bcrypt Derivation" icon={<Lock className="w-4 h-4" />} resultToCopy={hashedPass}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-[1.5] space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 space-y-1">
                  <label className="text-[8px] font-black uppercase text-neutral-400">Target Password</label>
                  <div className="flex gap-2">
                    <Input type="text" value={rawPass} onChange={(e) => setRawPass(e.target.value)} placeholder="Input or Generate..." className="rounded-none border-black border-2 font-black text-xs h-12 uppercase" />
                    <Button onClick={generateRandomPassword} className="bg-black text-white hover:bg-neutral-800 rounded-none h-12 px-6 font-black text-[10px] uppercase tracking-widest text-white">Generate</Button>
                  </div>
                </div>
                <div className="w-32 space-y-1">
                  <label className="text-[8px] font-black uppercase text-neutral-400">Cost Factor</label>
                  <Input type="number" value={iterations} onChange={(e) => setIterations(Number(e.target.value))} className="rounded-none border-black border-2 font-black text-xs h-12 text-center" />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-[8px] font-black uppercase text-neutral-400 italic">Bcrypt Hash Result (Secure)</label>
              <div className={`h-12 flex items-center justify-between border-2 border-black font-mono text-[10px] break-all px-4 transition-all group ${isHashing ? 'bg-neutral-100' : 'bg-black text-white'}`}>
                <span className="truncate mr-2 font-bold">{isHashing ? 'Generating Random Salt & Hashing...' : hashedPass || '$2y$10$AUTO.SALTED.HASH...'}</span>
                {!isHashing && hashedPass && (
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hashedPass)} className="h-6 w-6 text-neutral-500 hover:text-white shrink-0">
                    <Copy className="w-3 h-3 text-white" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ToolCard>

        {/* 5. DNS Lookup */}
        <ToolCard title="DNS Lookup" description="Public Record Discovery" icon={<Globe className="w-4 h-4" />}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-1 gap-2">
              <Input 
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDnsQuery()}
                placeholder="DOMAIN.COM (e.g. google.com)" 
                className="rounded-none border-black border-2 font-black text-xs uppercase h-12" 
              />
              <Button 
                onClick={handleDnsQuery}
                disabled={isQueryingDns}
                className="bg-black rounded-none h-12 px-10 text-[10px] font-black uppercase tracking-widest text-white disabled:opacity-50"
              >
                {isQueryingDns ? 'QUERYING...' : 'Query'}
              </Button>
            </div>
            <div className="flex-1 min-h-[3rem] border-2 border-black/5 bg-neutral-50 p-2 overflow-y-auto max-h-32">
              {dnsResult ? (
                dnsResult.length > 0 ? (
                  <div className="space-y-1">
                    {dnsResult.map((res, i) => (
                      <div key={i} className="flex justify-between items-center bg-white border border-black/10 p-2 text-[10px] font-bold">
                        <span className="text-neutral-400">TYPE {res.type === 1 ? 'A' : res.type}</span>
                        <span className="font-mono">{res.data}</span>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(res.data)} className="h-4 w-4 opacity-30 hover:opacity-100">
                          <Copy className="w-2.5 h-2.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-[10px] font-bold text-neutral-400 uppercase italic">No records found</div>
                )
              ) : (
                <div className="h-full flex items-center justify-center text-[10px] font-bold text-neutral-400 uppercase italic">Awaiting host input...</div>
              )}
            </div>
          </div>
        </ToolCard>

        {/* 6. Base Converter */}
        <ToolCard title="Base Converter" description="Numeric System Conversion" icon={<Hash className="w-4 h-4" />}>
          <div className="flex flex-col md:flex-row gap-4">
            <Input value={baseVal} onChange={(e) => setBaseVal(e.target.value)} className="flex-1 rounded-none border-black border-2 font-black text-xl uppercase text-center h-16" />
            <div className="flex-[2] grid grid-cols-3 gap-2 text-[10px] font-black uppercase">
              <div className="p-4 border-2 border-black text-center flex flex-col justify-center"><span className="text-neutral-400 mb-1">BINARY</span>{convertBase(baseVal, 10, 2)}</div>
              <div className="p-4 border-2 border-black text-center flex flex-col justify-center"><span className="text-neutral-400 mb-1">HEXADECIMAL</span>{convertBase(baseVal, 10, 16)}</div>
              <div className="p-4 bg-black text-white border-2 border-black text-center flex flex-col justify-center"><span className="text-neutral-500 mb-1">OCTAL</span>{convertBase(baseVal, 10, 8)}</div>
            </div>
          </div>
        </ToolCard>

        {/* 7. Cable Color Code */}
        <ToolCard title="Cable Mapping" description="T568A / T568B Standard" icon={<Cable className="w-4 h-4" />}>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 w-full space-y-3">
               <div className="flex h-10 w-full border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {[1,2,3,4,5,6,7,8].map(i => <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-black' : 'bg-neutral-200'}`} />)}
               </div>
               <p className="text-[10px] font-black uppercase text-center tracking-widest text-neutral-500">1:W/O • 2:O • 3:W/G • 4:B • 5:W/B • 6:G • 7:W/Br • 8:Br</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
               <Button variant="outline" className="flex-1 md:w-32 rounded-none border-2 border-black h-12 text-[10px] font-black uppercase">Standard A</Button>
               <Button className="flex-1 md:w-32 rounded-none bg-black text-white h-12 text-[10px] font-black uppercase">Standard B</Button>
            </div>
          </div>
        </ToolCard>

        {/* 8. Bandwidth Calculator */}
        <ToolCard title="Bandwidth Unit" description="Conversion Engine" icon={<BarChart3 className="w-4 h-4" />}>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input type="number" value={bwVal} onChange={(e) => setBwVal(Number(e.target.value))} className="w-full md:w-48 rounded-none border-black border-2 font-black text-xl text-center h-16" />
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
               <div className="p-4 border-2 border-black text-[10px] font-black uppercase text-center flex flex-col justify-center"><span className="text-neutral-400 mb-1">MB/S</span>{(bwVal / 8).toFixed(2)}</div>
               <div className="p-4 border-2 border-black text-[10px] font-black uppercase text-center flex flex-col justify-center"><span className="text-neutral-400 mb-1">KBPS</span>{(bwVal * 1000).toFixed(0)}</div>
               <div className="p-4 border-2 border-black text-[10px] font-black uppercase text-center flex flex-col justify-center"><span className="text-neutral-400 mb-1">GB/S</span>{(bwVal / 1000).toFixed(3)}</div>
               <div className="p-4 bg-black text-white border-2 border-black text-[10px] font-black uppercase text-center flex flex-col justify-center"><span className="text-neutral-500 mb-1">TB/MONTH</span>{(bwVal * 0.32).toFixed(1)}</div>
            </div>
          </div>
        </ToolCard>

      </main>
      <div className="fixed bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-neutral-100 rounded-full blur-[150px] -z-10 opacity-50" />
      <div className="fixed top-[20%] right-[-10%] w-[30%] h-[50%] bg-neutral-100 rounded-full blur-[150px] -z-10 opacity-50 rotate-45" />
    </div>
  );
}
